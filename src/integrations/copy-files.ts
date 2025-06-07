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

              // Get the content of the course directory 
              const courseDirContent = await fs.readdir(path.join(contentDir, courseDir.name), { withFileTypes: true });
              
              // Check if the course directory contains a JSON file
              const jsonFiles = courseDirContent
                .filter(file => file.isFile() && file.name.endsWith('.json'))
              const hasJsonFile = (jsonFiles.length > 0);
              
              if (jsonFiles.length === 0) {
                console.warn(`Warning: No JSON file found in course directory ${courseDir.name}`);
                continue;
              }
              else if (jsonFiles.length > 1) {
                console.warn(`Warning: Multiple JSON files found in course directory ${courseDir.name}. Using the first one.`);
              }
              
              // Check if the course directory contains a 'files' folder
              const generalCourseContentFolderName = 'files'
              const hasFilesFolder = courseDirContent.some(file => file.isDirectory() && file.name === generalCourseContentFolderName);
              if (!hasFilesFolder) {
                console.warn(`Warning: No 'files' folder found in course directory ${courseDir.name}`);
                continue;
              }
              
              // Construct the path to the course directory
              const courseFilesPath = path.join(contentDir, courseDir.name, generalCourseContentFolderName);
              const courseFilesDestDir = path.join(destDir, courseDir.name, generalCourseContentFolderName);
              
              // Create course destination directory
              await fs.mkdir(courseFilesDestDir, { recursive: true });
              
              // Read the course JSON file
              const jsonFile = jsonFiles[0];
              if (!jsonFile) {
                console.warn(`Warning: No JSON file found in course directory ${courseDir.name}`);
                continue;
              }
              const jsonPath = path.join(contentDir, courseDir.name, jsonFile.name);
              console.log(`Processing course: ${courseDir.name}, JSON file: ${jsonPath}`);
              
              try {
                const jsonContent = await fs.readFile(jsonPath, 'utf-8');
                const courseData = JSON.parse(jsonContent);
                
                // Process all videos in the course
                for (const section of courseData.content || []) {
                  for (const subsection of section.sectionContent || []) {
                    for (const video of subsection.subsectionContent || []) {
                      if (video.pdfName && video.visible) {
                        const pdfNames = Array.isArray(video.pdfName) ? video.pdfName : [video.pdfName];
                        
                        for (const pdfName of pdfNames) {
                          const srcPath = path.join(courseFilesPath, pdfName);
                          const destPath = path.join(courseFilesDestDir, pdfName);
                          
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