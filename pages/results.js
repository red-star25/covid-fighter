import { useRouter } from "next/router";
import NavBar from "../components/NavBar/NavBar";
import useSwr from "swr";
import Image from "next/image";
import Autolinker from "autolinker";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Results() {
  const router = useRouter();
  const { location } = router.query;
  const { resource } = router.query;
  const { data, error } = useSwr(
    `/api/getData?location=${location}&resource=${resource}`,
    fetcher
  );

  if (error)
    return (
      <center>
        <div>Failed to load data</div>
      </center>
    );
  if (!data)
    return (
      <center>
        <div>Loading...</div>
      </center>
    );

  var autolinker = new Autolinker({
    urls: {
      schemeMatches: true,
      wwwMatches: true,
      tldMatches: true,
    },
    email: true,
    phone: true,
    mention: "twitter",
    hashtag: "twitter",

    stripPrefix: true,
    stripTrailingSlash: true,
    newWindow: true,

    truncate: {
      length: 0,
      location: "end",
    },
  });

  return (
    <div className="h-[100vh] w-[100%] ">
      <NavBar />
      <center>
        <div className="mt-5 grid grid-cols-1 gap-x-2 w-[90%] md:grid-cols-2">
          {data.statuses.map((tweet) => {
            return (
              <div className="w-[100%] h-[fit-content] flex flex-col shadow-md mt-1 rounded-xl">
                <div
                  onClick={() =>
                    (window.location = `https://twitter.com/${tweet.user.screen_name}`)
                  }
                  className="topSection flex items-center justify-between cursor-pointer"
                >
                  <div className="topLeft flex mt-1 items-center mx-3">
                    <img
                      src={tweet.user.profile_image_url}
                      className="w-10 h-10 rounded-full"
                      alt="userImage"
                    />
                    <div className="userInfo flex flex-col justify-start items-start ml-2">
                      <p className="text-lg font-bold">{tweet.user.name}</p>
                      <p className="text-sm text-gray-600 font-semibold">
                        @{tweet.user.screen_name}
                      </p>
                    </div>
                  </div>
                  <div className="topRight mr-2">
                    <Image
                      onClick={() => {}}
                      src="/twitterLogo.svg"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>

                <div
                  className="text-lg text-left mt-3 mx-3"
                  dangerouslySetInnerHTML={{
                    __html:
                      tweet.retweeted_status === undefined
                        ? autolinker.link(tweet.full_text)
                        : autolinker.link(tweet.retweeted_status.full_text),
                  }}
                ></div>
                {tweet.is_quote_status ? (
                  <div className="grid grid-cols-3 gap-x-3 gap-y-3">
                    {"quoted_status" in tweet
                      ? tweet.quoted_status.entities.media.map((media) => {
                          return <img src={media.media_url} alt="" />;
                        })
                      : ""}
                  </div>
                ) : (
                  <div />
                )}
                <div className="bottom flex  justify-between h-full items-end mx-3 pb-2 mt-5">
                  <div dangerouslySetInnerHTML={{ __html: tweet.source }}></div>
                  <p>{tweet.created_at.split("+")[0]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </center>
    </div>
  );
}
