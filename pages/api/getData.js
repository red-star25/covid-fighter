import Cors from "cors";
import initMiddleware from "../../components/initMiddleware/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  var expansion =
    "attachments.poll_ids,attachments.media_keys,author_id,geo.place_id,in_reply_to_user_id,referenced_tweets.id,entities.mentions.username,referenced_tweets.id.author_id";
  var media_fields =
    "duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,width";
  // Run cors
  await cors(req, res);
  // Rest of the API logic
  var response = await fetch(
    `https://api.twitter.com/1.1/search/tweets.json?q=${req.query.location} ${req.query.resource} available&count=100&tweet_mode=extended&expansion=${expansion}&media_fields=${media_fields}`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );
  res.status(200).json(response.body);
}
