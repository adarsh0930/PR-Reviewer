require("dotenv").config();
const axios = require("axios");
const OpenAI = require("openai");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OWNER = process.env.OWNER;
const REPO = process.env.REPO;
const PR_NUMBER = process.env.PR_NUMBER;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3.diff",
};

async function getPRDiff() {
  try {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/pulls/${PR_NUMBER}`;
    const response = await axios.get(url, { headers });
    console.log('response', response.data)
    return response.data; // Raw diff
  } catch (error) {
    console.error("Error fetching PR diff:", error.response?.data || error.message);
    return null;
  }
}

