import fs from 'fs/promises';
import type { Loader } from "astro/loaders";
import { slugify } from '@/utils/strings';

// Custom loader for alerts that auto-generates IDs
export function alertsLoader({path}: {path?: string} = {}): Loader {
    const pathToFile = path || "./src/content/banner-alerts.json";
    
    return {
        name: "alerts-loader",
        load: async ({store, logger, parseData, generateDigest}) => {
            try {
                logger.info(`Loading alerts from ${pathToFile}`);
                
                const fileContent = await fs.readFile(pathToFile, "utf-8");
                const alerts = JSON.parse(fileContent);
                
                if (!Array.isArray(alerts)) {
                    logger.warn("Expected alerts file to contain an array");
                    return;
                }
                
                // Clear existing entries
                store.clear();
                
                // Process each alert
                for (const [index, alert] of alerts.entries()) {
                    const id = slugify(alert.message) || `alert-${index}`;
                    
                    // Ensure clean data structure
                    const cleanAlert = {
                        message: alert.message,
                        visible: alert.visible ?? true,
                        label: alert.label ?? "alert",
                        autoHideBanner: alert.autoHideBanner ?? false,
                        autoHideBannerOn: alert.autoHideBannerOn,
                        url: alert.url
                    };
                    
                    const digest = generateDigest(cleanAlert);
                    
                    store.set({
                        id,
                        data: cleanAlert,
                        digest
                    });
                }
                
                logger.info(`Loaded ${alerts.length} alerts`);
            } catch (error) {
                logger.error(`Error loading alerts: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    };
}