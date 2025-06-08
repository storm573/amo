// Centralized product visuals system using modular data files
import { defaultShowcase } from './default'
import { pickleballData } from './pickleball'
import { couchData } from './couches'
import { strollerData } from './strollers'

// Export all visuals with consistent interface
export const productVisuals = {
  default: defaultShowcase,
  pickleball: pickleballData,
  couch: couchData,
  stroller: strollerData
}

// Helper function to detect product category from conversation
export function detectProductCategory(messages: string[]): string {
  const allText = messages.join(' ').toLowerCase()
  
  if (allText.includes('pickleball') || allText.includes('paddle')) {
    return 'pickleball'
  }
  if (allText.includes('couch') || allText.includes('sofa') || allText.includes('furniture') || allText.includes('living room')) {
    return 'couch'
  }
  if (allText.includes('stroller') || allText.includes('baby') || allText.includes('infant') || allText.includes('toddler')) {
    return 'stroller'
  }
  
  return 'default'
} 