const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const router = require('./src/routes/index')
const db = require('./src/config/db')
const cors = require('cors')
const app = express()
const http = require('http')
const socketIo = require('socket.io')
const upload = require('./src/multer/multer')
const path = require('path')
const ffmpegStatic = require('ffmpeg-static')
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegStatic)
const server = http.createServer(app)
const Videos = require('./src/models/videos')

const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000', "*"]
    }
})

let onlineUsers = []
const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user?.username === username) && onlineUsers.push({ username, socketId })
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user?.socketId !== socketId)
}

const getUser = (username) => {
    return onlineUsers.find(user => user?.username === username)
}

io?.on("connection", socket => {
    socket?.on("upload", user=>{
        console.log(`${user} is ready to upload`);
    })
    socket?.on("login", (user) => {
        addNewUser(user, socket?.id)
        socket.join(user)
        console.log(`${user} has login . . .`);
        console.log({onlineUsers});
    })
    socket.on("disconnet", () => {
        removeUser(socket?.id)
    })

    let progress = ""
    socket.on("startUpload", (data) => {
        console.log(`${data} start uploading  . . .`);
        // app.post('/test', async (req, res)=>{
        //     console.log({body : req.body});
        //     res.status(200).json({msg : `Hello ${data}`})
        // })
        app.post('/video', upload.single("video"), async (req, res) => {
            console.log(req.body);
            try {
                const {
                    video_location = "",
                    description = "",
                    title = "",
                    tags = "",
                    is_movie = "",
                    is_stock = "",
                    is_short = "",
                    user_id = "",
                    thumbnail = "",
                } = req.body

                // req.body["240p"]

                const file = req?.filename
                let checkPath = path.resolve(`./original/${file}`)

                const user = getUser(data)
                console.log({checkPath});

                //create thumbnail
                ffmpeg(checkPath).setFfmpegPath(ffmpegStatic).screenshots({
                    timestamps: [1.00],
                    filename: `thubmnail-${file}.png`,
                    folder: './thumbnail'
                })

                //create 240p
                ffmpeg().input(checkPath).outputOptions('-vf', 'scale=-2:240')
                    .saveToFile(`./converted/240p-${file}`).on('progress', (pgress) => {
                        // setInterval(() => {
                            const totalData = data
                            const progress = pgress?.timemark

                            console.log({totalData, progress});
                            // let pergentace = (totalData - progress) / 100
                            // console.log({pergentace});
                            // console.log({user : user?.socketId});
                            io?.to(user?.socketId).emit("sendProggress", pgress)
                            io?.to(user?.socketId).emit("testupload", pgress)
                        // }, 1000)
                        console.log({pgress});
                    }).on('end', () => {
                        console.log(`240 HAS FINISHED`);
                        res.status(200).json({
                            msg: "Success",
                            url: `${process.env.STORAGE_HOST}/converted/240p-${file}`
                        })
                    })
                //create 1080p video
                ffmpeg().input(checkPath).outputOptions('-vf', 'scale=-2:1080').saveToFile(`./converted/1080p-${file}`).on('progress', (progress) => {
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
        })
    })

    app.post('/video', upload.single("video"), async (req, res) => {
        console.log(req.body);
        try {
            const {
                video_location = "",
                description = "",
                title = "",
                tags = "",
                is_movie = "",
                is_stock = "",
                is_short = "",
                user_id = "",
                thumbnail = "",
            } = req.body

            // req.body["240p"]

            const file = req?.filename
            let checkPath = path.resolve(`./original/${file}`)

            const user = getUser(data)
            console.log({checkPath});

            //create thumbnail
            ffmpeg(checkPath).setFfmpegPath(ffmpegStatic).screenshots({
                timestamps: [1.00],
                filename: `thubmnail-${file}.png`,
                folder: './thumbnail'
            })

            //create 240p
            ffmpeg().input(checkPath).outputOptions('-vf', 'scale=-2:240')
                .saveToFile(`./converted/240p-${file}`).on('progress', (pgress) => {
                    // setInterval(() => {
                        const totalData = data
                        const progress = pgress?.timemark

                        console.log({totalData, progress});
                        // let pergentace = (totalData - progress) / 100
                        // console.log({pergentace});
                        // console.log({user : user?.socketId});
                        io?.to(user?.socketId).emit("sendProggress", pgress)
                        io?.to(user?.socketId).emit("testupload", pgress)
                    // }, 1000)
                    console.log({pgress});
                }).on('end', () => {
                    console.log(`240 HAS FINISHED`);
                    res.status(200).json({
                        msg: "Success",
                        url: `${process.env.STORAGE_HOST}/converted/240p-${file}`
                    })
                })
            //create 1080p video
            ffmpeg().input(checkPath).outputOptions('-vf', 'scale=-2:1080').saveToFile(`./converted/1080p-${file}`).on('progress', (progress) => {
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
    })

    app.get("/test", (req, res) => {
        res.status(200).json({ msg: "Hello :)" })
    })
})

app.use(cors({
    origin: ['http://localhost:3000', "*"],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}))
app.use(router)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(__dirname))
const port = process.env.PORT

db.authenticate().then(() => {
    console.log(`Database connected`);
}).catch((err) => console.log({ err }))

server.listen(port, () => {
    console.log(`App listen on port ${port}`);
})

app.get("/", (req, res)=>{
    res.status(200).json({
        msg : "Wellcome to my simple API"
    })
})