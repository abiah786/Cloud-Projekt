const restify = require('restify');
const { BotFrameworkAdapter, ActivityHandler } = require('botbuilder');

// Eigener Bot mit Antwortlogik
class THMBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const message = context.activity.text.toLowerCase();

            if (message.includes("prüfung")) {
                await context.sendActivity("Die Prüfungsanmeldung erfolgt über das Campusportal.");
            } else if (message.includes("stundenplan")) {
                await context.sendActivity("Deinen Stundenplan findest du unter campus.thm.de.");
            } else if (message.includes("bibliothek")) {
                await context.sendActivity("Die Bibliothek ist Montag bis Freitag von 8–18 Uhr geöffnet.");
            } else if (message.includes("studienbescheinigung")) {
                await context.sendActivity("Du kannst sie im Campusportal unter 'Dokumente' herunterladen.");
            } else if (message.includes("krank")) {
                await context.sendActivity("Im Krankheitsfall informiere bitte sofort das Prüfungsamt und reiche ein Attest ein.");
            } else if (message.includes("vorlesungsskripte")) {
                await context.sendActivity("Skripte findest du meist im Moodle-Kurs deiner Veranstaltung.");
            } else if (message.includes("tutorium")) {
                await context.sendActivity("Ja, es gibt Tutorien – Infos findest du in Moodle oder bei der Fachschaft.");
            } else if (message.includes("passwort")) {
                await context.sendActivity("Du kannst dein Passwort über das IDM-Portal zurücksetzen.");
            } else if (message.includes("studienberater")) {
                await context.sendActivity("Deinen Studienberater findest du auf der Website deiner Fakultät.");
            } else if (message.includes("modul anmelden")) {
                await context.sendActivity("Die Modulanmeldung erfolgt online über das Campusportal.");
            } else {
                await context.sendActivity("Ich konnte leider keine passende Antwort finden.");
            }

            await next();
        });
    }
}

// Adapter & Bot
const adapter = new BotFrameworkAdapter({
    appId: '',
    appPassword: ''
});

const bot = new THMBot();

// Server starten
const server = restify.createServer();
server.listen(3978, () => {
    console.log('Bot läuft unter http://localhost:3978');
});

// Routing
server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});