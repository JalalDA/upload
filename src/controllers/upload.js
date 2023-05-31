const path = require('path')
const ffmpegStatic = require('ffmpeg-static')
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegStatic)

const saveAndConvert = async (req, res)=>{ 
    try {
        const file = req?.filename
        let checkPath = path.resolve(`./original/${file}`)
        //create thumbnail
        ffmpeg(checkPath).setFfmpegPath(ffmpegStatic).screenshots({
            timestamps : [0.10],
            filename : `thubmnail-${file}.png`,
            folder : './thumbnail'
        })

        //create 240p
        ffmpeg().input(checkPath).outputOptions('-vf', 'scale=-2:240')
        .saveToFile(`./converted/240p-${file}`).on('progress', (progress) => {
            if (progress.percent) {
                console.log(`Processing: ${Math.floor(progress.percent)}% done`);
            }
        }).on('end', () => {
            console.log(`240 HAS FINISHED`);
            res.status(200).json({
                msg: "Success",
                url : `${process.env.STORAGE_HOST}/converted/240p-${file}`
            })
        })
        //create 1080p video
        ffmpeg().input(checkPath).outputOptions('-vf', 'scale=-2:1080').saveToFile(`./converted/1080p-${file}`).on('progress', (progress) => {
            console.log({progress});
            console.log(`Processing: ${Math.floor(progress?.percent)}% done`);

        }).on('end', () => {
            console.log(`1080 HAS FINISHED`);
        })

        //create 720p video
        ffmpeg().input(checkPath).outputOptions('-vf', 'scale=-2:720').saveToFile(`./converted/720p-${file}`).on('progress', (progress) => {
            if (progress.percent) {
                console.log(`Processing: ${Math.floor(progress.percent)}% done`);
            }
        }).on('end', () => {
            console.log(`720 HAS FINISHED`);
        })

        //create 480p video
        ffmpeg().input(checkPath).outputOptions('-vf', 'scale=-2:480').saveToFile(`./converted/480p-${file}`).on('progress', (progress) => {
            if (progress.percent) {
                console.log(`Processing: ${Math.floor(progress.percent)}% done`);
            }
        }).on('end', () => {
            console.log(`480 HAS FINISHED`);
        })

        //create 360p video
        ffmpeg().input(checkPath).outputOptions('-vf', 'scale=-2:360').saveToFile(`./converted/360p-${file}`).on('progress', (progress) => {
            if (progress.percent) {
                console.log(`Processing: ${Math.floor(progress.percent)}% done`);
            }
        }).on('end', () => {
            console.log(`360 HAS FINISHED`);
        })
    } catch (error) {
        console.log({ error });
        res.status(400).json({ error })
    }
}


module.exports = {
    saveAndConvert
}