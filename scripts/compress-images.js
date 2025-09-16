const imagemin = require('imagemin').default;
const imageminPngquant = require('imagemin-pngquant').default;
const fs = require('fs');
const path = require('path');

async function compressImages() {
  const inputDir = 'src/app/assets';
  const outputDir = 'src/app/assets/compressed';

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🖼️  Starting image compression...');

  try {
    const files = await imagemin([`${inputDir}/*.png`], {
      destination: outputDir,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8], // Quality range (0-1)
          speed: 1, // Speed vs quality (1-11, 1 is slowest but best quality)
          strip: true, // Remove metadata
        }),
      ],
    });

    console.log(`✅ Compressed ${files.length} images successfully!`);

    // Show file size comparison
    console.log('\n📊 File size comparison:');
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    for (const file of files) {
      const originalPath = path.join(inputDir, path.basename(file.destinationPath));
      const originalSize = fs.statSync(originalPath).size;
      const compressedSize = fs.statSync(file.destinationPath).size;
      const savings = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);

      totalOriginalSize += originalSize;
      totalCompressedSize += compressedSize;

      console.log(
        `${path.basename(file.destinationPath)}: ${(originalSize / 1024).toFixed(0)}KB → ${(compressedSize / 1024).toFixed(0)}KB (${savings}% smaller)`
      );
    }

    const totalSavings = (
      ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) *
      100
    ).toFixed(1);
    console.log(
      `\n📈 Total: ${(totalOriginalSize / 1024).toFixed(0)}KB → ${(totalCompressedSize / 1024).toFixed(0)}KB (${totalSavings}% smaller)`
    );

    console.log('\n🎉 Image compression complete!');
    console.log(
      '💡 Run "cp src/app/assets/compressed/*.png src/app/assets/" to replace original images'
    );
    console.log('💡 Or run "pnpm run compress-images:replace" to automatically replace them');
  } catch (error) {
    console.error('❌ Error compressing images:', error);
  }
}

compressImages();
