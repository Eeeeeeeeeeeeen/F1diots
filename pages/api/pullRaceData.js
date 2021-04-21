const ftp = require("basic-ftp");
const path = require("path");
const fs = require("fs");

const client = new ftp.Client();
client.ftp.verbose = true;

const tmpDir = "/Temp";

export default async function handler(req, res) {
  const results = await GetResults();
  const files = results.join(',')
  res.end(files);
}

async function GetResults() {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  try {
    await client.access({
      host: process.env.RaceDataFtpHost,
      port: process.env.RaceDataFtpPort,
      user: process.env.RaceDataFtpUsername,
      password: process.env.RaceDataFtpPassword,
    });
    await client.downloadToDir(tmpDir, process.env.RaceDataFtpRemoteDir);
    const files = fs.readdirSync(tmpDir);
    console.log(files)
    
    return files;
  } catch (err) {
    console.log(err);
  }
  client.close();
}
