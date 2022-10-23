const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, MessageAttachment  } = require('discord.js');
const bot = new Discord.Client()
const fetch = require("node-fetch")
const https = require("https")

bot.on('ready', () => {
    console.info(`Conectado como ${bot.user.tag}!`);
});

bot.login("MTAzMzc5NDE2NTM2NjA2NzI0MA.G6SHLC.vJfqG5VkZ5ULUPcYbE4LHWkOrcWnq8PHsjm3vw")

bot.on('message', msg => {
    
    if(msg.content.startsWith("f!cfx")){

        const args3 = msg.content.slice("f!find".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        
        var headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.3",
        }
        
        https.get(urlfivem, function(res) {

            if(res.statusCode == 404){

                const mensaje = new Discord.MessageEmbed()
                .setColor("#2ECAF9")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Código no válido```")
                .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                msg.channel.send(mensaje);

            }else{

                fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {

                    if(!out["Data"]["connectEndPoints"][0].startsWith("http")) {

                        var split = `${out["Data"]["connectEndPoints"][0]}`.split(":")
                        var urlip = "http://ip-api.com/json/" + split[0]
                        fetch(urlip)
                            .then(res => res.json())
                            .then((out2) => {

                                if (out["icon"]) {
                                    var icon = out2["icon"]
                                    let file = new Buffer.from(icon, 'base64')
                                    const att = new Discord.MessageAttachment(file, "graph.png")
                                    const mensaje = new Discord.MessageEmbed()

                                        .setColor("#2ECAF9")
                                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                                        .addField("IP:Puerto", `\`${out["Data"]["connectEndPoints"][0]}\`\n\n/players.json: [Click Aqui](http://${out["Data"]["connectEndPoints"][0]}/players.json)\n/info.json: [Click Aqui](http://${out["Data"]["connectEndPoints"][0]}/info.json)\n/dynamic.json: [Click Aqui](http://${out["Data"]["connectEndPoints"][0]}/dynamic.json)`)
                                        .addField("Detalles del servidor", `IP: \`${split[0]}\`\n País: \`${out2["country"]}\`\n Ciudad: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Código postal: \`${out2["zip"]}\`\n Zona horaria: \`${out2["timezone"]}\`\n`)
                                        .addField("Server FiveM", `Nombre Server: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Jugadores en línea: \`${out["Data"]["players"].length}\`\n Max Jugadores: \`${out["Data"]["svMaxclients"]}\`\n Artefactos: \`${out["Data"]["server"]}\`\n Recursos: \`${out["Data"]["resources"].length}\`\n Onesync habilitado?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                                        .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                                        .setThumbnail("attachment://graph.png")
                                        .attachFiles(att)

                                    msg.channel.send(mensaje);
                                } else {
                                    const mensaje = new Discord.MessageEmbed()
                                        .setColor("#2ECAF9")
                                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                                        .addField("IP:Puerto", `\`${out["Data"]["connectEndPoints"][0]}\`\n\n/players.json: [Click Aqui](http://${out["Data"]["connectEndPoints"][0]}/players.json)\n/info.json: [Click Aqui](http://${out["Data"]["connectEndPoints"][0]}/info.json)\n/dynamic.json: [Click Aqui](http://${out["Data"]["connectEndPoints"][0]}/dynamic.json)`)
                                        .addField("Detalles del servidor", `IP: \`${split[0]}\`\n País: \`${out2["country"]}\`\n Ciudad: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Código postal: \`${out2["zip"]}\`\n Zona horaria: \`${out2["timezone"]}\`\n`)
                                        .addField("Server FiveM", `Nombre Server: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Jugadores en línea: \`${out["Data"]["players"].length}\`\n Max Jugadores: \`${out["Data"]["svMaxclients"]}\`\n Artefactos: \`${out["Data"]["server"]}\`\n Recursos: \`${out["Data"]["resources"].length}\`\n Onesync habilitado?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                                        .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                                    msg.channel.send(mensaje);
                                }


                            })

                    }else{
                        const mensaje = new Discord.MessageEmbed()
                            .setColor("#2ECAF9")
                            .setAuthor(msg.author.tag, msg.author.avatarURL())
                            .setDescription("```\n No se pueden encontrar los detalles del servidor...```")
                            .addField("Cfx Url", `\`${out["Data"]["connectEndPoints"][0]}\``)
                            .addField("Servidor FiveM", `Nombre Server: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Jugadores en línea: \`${out["Data"]["players"].length}\`\n Max Jugadores: \`${out["Data"]["svMaxclients"]}\`\n Artefactos: \`${out["Data"]["server"]}\`\n Recursos: \`${out["Data"]["resources"].length}\`\n Onesync habilitado?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                            .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                        msg.channel.send(mensaje);
                    }
                }).catch(() => {
                    const mensaje = new Discord.MessageEmbed()
                        .setColor("#2ECAF9")
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setDescription("```\n Código no válido```")
                        .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                    msg.channel.send(mensaje);

            })
        }

    })
        

    }else if(msg.content.startsWith("f!ip")){
        const args3 = msg.content.slice("f!ip".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        https.get(urlfivem, function(res) {
            if(res.statusCode == 404){
                const mensaje = new Discord.MessageEmbed()
                .setColor("#2ECAF9")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Código no válido```")
                .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                msg.channel.send(mensaje);
            }else{
                fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {
                    const mensaje = new Discord.MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.avatarURL())
                    .setColor("#2ECAF9")
                    .addField("IP:Puerto", `\`${out["Data"]["connectEndPoints"][0]}\``)
                    .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                    msg.channel.send(mensaje);
                }).catch(() => {
                    const mensaje = new Discord.MessageEmbed()
                        .setColor("#2ECAF9")
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setDescription("```\n Código no válido```")
                        .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                    msg.channel.send(mensaje);

                })
            }
            
        })
        
    }else if(msg.content.startsWith("f!help")){

        const mensaje = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setColor("#2ECAF9")
        .addField("\📜 CFX Server Info", "`f!cfx [cfx code]`")
        .addField("\🚩 Obtener IP del servidor", "`f!ip [cfx code]`")
        .addField("\🥏 Obtener el logo del servidor", "`f!logo [cfx code]`")
        .addField("\✨ Obtener tags de servidor", "`f!tags [cfx code]`")
        .addField("\💎 Obtener recursos del servidor", "`f!resources [cfx code]`")
        .addField("\🔱 Obtener propietario del servidor", "`f!owner [cfx code]`")
        .setFooter("👑Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
        msg.channel.send(mensaje);
    
    }else if(msg.content.startsWith("f!logo")){

        const args3 = msg.content.slice("f!logo".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {
                    
                        if(!out["Data"]["connectEndPoints"][0].startsWith("http")){
                            var urlip = `http://${out["Data"]["connectEndPoints"][0]}/info.json`
                                                            
                                fetch(urlip)
                                .then(res => res.json())
                                .then((out2) => {
                                    
                                    var icon = out2["icon"]
                                    let file = new Buffer.from(icon, 'base64')
                                    const att = new Discord.MessageAttachment(file, "icon.png")
                                    const mensaje = new Discord.MessageEmbed()
        
                                    .setColor("#2ECAF9")
                                    .setAuthor(msg.author.tag, msg.author.avatarURL())
                                    //.setDescription("Image from server")
                                    .setImage("attachment://icon.png")
                                    //.setThumbnail("attachment://graph.png")
                                    .attachFiles(att)
        
                                    msg.channel.send(mensaje);
                                })
                        }
                }).catch(() => {
            const mensaje = new Discord.MessageEmbed()
                .setColor("#2ECAF9")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Código no válido```")
                .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
            msg.channel.send(mensaje);

        })
    }else if(msg.content.startsWith("f!tags")){

        const args3 = msg.content.slice("f!logo".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {
                    if(out["Data"]["vars"]["tags"] && out["Data"]["hostname"]){

                        var tags = out["Data"]["vars"]["tags"]
                        var name = out["Data"]["hostname"]

                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#2ECAF9")
                        .addField("Nombre del servidor", `\`${name}\``.substring(0, 390))
                        .addField("Tags de servidor", `\`${tags}\``.substring(0, 1024))
                        .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                        msg.channel.send(mensaje);

                    }else{
                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#2ECAF9")
                        .setDescription("```\n No se pueden encontrar tags del servidor```")
                        msg.channel.send(mensaje);
                    }
                    
                
                }).catch(() => {
            const mensaje = new Discord.MessageEmbed()
                .setColor("#2ECAF9")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Código no válido```")
                .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
            msg.channel.send(mensaje);

        })

    }else if(msg.content.startsWith("f!resources")){

        const args3 = msg.content.slice("f!resources".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        fetch(urlfivem, { headers: headers })
                .then(res => res.json())
                .then((out) => {
                    if(out["Data"]["resources"] && out["Data"]["hostname"]){

                        var resources = out["Data"]["resources"]
                        var name = out["Data"]["hostname"]

                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#2ECAF9")
                        .addField("Nombre del servidor", `\`${name}\``.substring(0, 390))
                        .addField("Recursos del servidor", `\`${resources}\``.substring(0, 1024))
                        .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                        msg.channel.send(mensaje);

                    }else{
                        const mensaje = new Discord.MessageEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setColor("#2ECAF9")
                        .setDescription("```\n No se pueden encontrar tags del servidor```")
                        msg.channel.send(mensaje);
                    }
                    
                
                }).catch(() => {
            const mensaje = new Discord.MessageEmbed()
                .setColor("#2ECAF9")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Código no válido```")
                .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
            msg.channel.send(mensaje);

        })
    
    }else if(msg.content.startsWith("f!owner")){
        const args3 = msg.content.slice("f!owner".length).split(' ');
        var code = args3[1]
        var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/"+code
        fetch(urlfivem, { headers: headers })
        .then(res => res.json())
        .then((out) => {
            if(out["Data"]["ownerName"]){
                const mensaje = new Discord.MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setColor("#2ECAF9")
                .addField("Nombre del propietario", `\`${out["Data"]["ownerName"]}\``)
                .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
                 msg.channel.send(mensaje);
            }
        }).catch(() => {
            const mensaje = new Discord.MessageEmbed()
                .setColor("#2ECAF9")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Código no válido```")
                .setFooter("Creado Por Sazzmix#8447 & 𝕰𝖈𝖑𝖞𝖕𝖘𝖊-𝕲𝖆𝖓𝖌#4098")
            msg.channel.send(mensaje);

        })
    }

})

