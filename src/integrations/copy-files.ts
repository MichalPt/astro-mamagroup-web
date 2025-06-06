import type { AstroIntegration } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export default function copyFiles(): AstroIntegration {
  return {
    name: 'copy-downloadable-files',
    hooks: {
      'astro:build:start': async () => {
        console.log('Copying downloadable files...');
        
        try {
          // Read content collection files directly from filesystem
          const contentDir = path.join(process.cwd(), 'src', 'content', 'mancal-teaching');
          const destDir = path.join(process.cwd(), 'public', 'content', 'mancal-teaching');
          
          // Create destination directory
          await fs.mkdir(destDir, { recursive: true });
          
          // Read all course directories
          const courseDirs = await fs.readdir(contentDir, { withFileTypes: true });
          
          for (const courseDir of courseDirs) {
            if (courseDir.isDirectory()) {
              const coursePath = path.join(contentDir, courseDir.name);
              const courseDestDir = path.join(destDir, courseDir.name);
              
              // Create course destination directory
              await fs.mkdir(courseDestDir, { recursive: true });
              
              // Read the course JSON file
              const jsonPath = path.join(coursePath, 'index.json');
              
              try {
                const jsonContent = await fs.readFile(jsonPath, 'utf-8');
                const courseData = JSON.parse(jsonContent);
                
                // Process all videos in the course
                for (const section of courseData.content || []) {
                  for (const subsection of section.sectionContent || []) {
                    for (const video of subsection.subsectionContent || []) {
                      if (video.pdfName) {
                        const pdfNames = Array.isArray(video.pdfName) ? video.pdfName : [video.pdfName];
                        
                        for (const pdfName of pdfNames) {
                          const srcPath = path.join(coursePath, pdfName);
                          const destPath = path.join(courseDestDir, pdfName);
                          
                          try {
                            // Check if source file exists
                            await fs.access(srcPath);
                            await fs.copyFile(srcPath, destPath);
                            console.log(`Copied: ${courseDir.name}/${pdfName}`);
                          } catch (error) {
                            console.warn(`Warning: Could not copy ${courseDir.name}/${pdfName}:`, error.message);
                          }
                        }
                      }
                    }
                  }
                }
              } catch (jsonError) {
                console.warn(`Warning: Could not read course data for ${courseDir.name}:`, jsonError.message);
              }
            }
          }
          
          console.log('File copying completed!');
        } catch (error) {
          console.error('Error copying files:', error);
        }
      }
    }
  };
}