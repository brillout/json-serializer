/**
 * Run all examples in the examples/ directory
 */

import { readdir } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

runAllExamples()

async function runAllExamples() {
  console.log('🎯 Running all json-serializer examples...\n')

  // Read all .js files from examples directory
  const files = await readdir(join(__dirname, 'examples'))
  const examples = files.filter((file) => file.endsWith('.js')).sort()

  let successCount = 0
  let failureCount = 0

  for (const example of examples) {
    try {
      console.log(`🚀 Running ${example}...`)
      await import(`./examples/${example}`)
      console.log(`✅ ${example} completed successfully\n`)
      successCount++
    } catch (error) {
      console.log(`❌ ${example} failed: ${error.message}\n`)
      failureCount++
    }
  }

  console.log('='.repeat(50))
  console.log(`✅ Successful: ${successCount}`)
  if (failureCount > 0) {
    console.log(`❌ Failed: ${failureCount}`)
    console.log(`📁 Total: ${examples.length}`)
    process.exit(1)
  } else {
    console.log('🎉 All examples completed successfully!')
  }
}
