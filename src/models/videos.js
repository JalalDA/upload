// import db  from '../config/db.js'
// import { DataTypes } from "sequelize";
const db = require('../config/db.js')
const {DataTypes} = require('sequelize')

const Videos = db.define("videos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey : true
    },
    video_id: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    short_id: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    thumbnail: {
        type: DataTypes.STRING
    },
    video_location: {
        type: DataTypes.STRING
    },
    youtube: {
        type: DataTypes.STRING
    },
    vimeo: {
        type: DataTypes.STRING
    },
    daily: {
        type: DataTypes.STRING
    },
    facebook: {
        type: DataTypes.STRING
    },
    ok: {
        type: DataTypes.STRING
    },
    twitch: {
        type: DataTypes.STRING
    },
    twitch_type: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.DATE
    },
    time_date: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.INTEGER
    },
    twitch: {
        type: DataTypes.STRING
    },
    tags: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.STRING
    },
    size: {
        type: DataTypes.INTEGER
    },
    converted: {
        type: DataTypes.INTEGER
    },
    category_id: {
        type: DataTypes.STRING
    },
    views: {
        type: DataTypes.INTEGER
    },
    featured: {
        type: DataTypes.INTEGER
    },
    registered: {
        type: DataTypes.STRING
    },
    privacy: {
        type: DataTypes.INTEGER
    },
    age_restriction: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.STRING
    }, 
    approved: {
        type: DataTypes.INTEGER
    },
    "240p" : {
        type: DataTypes.INTEGER
    },
    "360p": {
        type: DataTypes.INTEGER
    },
    "480p": {
        type: DataTypes.INTEGER
    },
    "720p": {
        type: DataTypes.INTEGER
    },
    "1080p": {
        type: DataTypes.INTEGER
    },
    "2048p": {
        type: DataTypes.INTEGER
    },
    "4096p": {
        type: DataTypes.INTEGER
    },
    sell_video: {
        type: DataTypes.INTEGER
    },
    sub_category: {
        type: DataTypes.STRING
    },
    geo_blocking: {
        type: DataTypes.STRING
    },
    demo: {
        type: DataTypes.STRING
    },    
    gif: {
        type: DataTypes.STRING
    },
    is_movie: {
        type: DataTypes.INTEGER
    },
    stars: {
        type: DataTypes.STRING
    },
    producer: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    movie_release: {
        type: DataTypes.STRING
    },
    quality: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.STRING
    },
    monetization: {
        type : DataTypes.INTEGER
    },
    rent_price : {
        type : DataTypes.INTEGER
    },
   stream_name : {
        type : DataTypes.STRING
    },
    live_time : {
        type : DataTypes.INTEGER
    },
    live_ended : {
        type : DataTypes.INTEGER
    },
    agora_resource_id : {
        type : DataTypes.STRING
    },
    agora_sid : {
        type : DataTypes.STRING
    },
    agora_token : {
        type : DataTypes.STRING
    },
    license : {
        type : DataTypes.STRING
    },
    is_stock : {
        type : DataTypes.INTEGER
    },
    trailer : {
        type : DataTypes.STRING
    },
    embedding :{
        type : DataTypes.INTEGER
    },
    live_chating : {
        type : DataTypes.STRING
    },
    publication_date : {
        type : DataTypes.DATE
    },
    is_short : {
        type :DataTypes.INTEGER
    }
}, {
    timestamps : false
})

module.exports = Videos