import { useState } from 'react';
import { doDel, doPost } from '../../services/api';

interface HeartTweetProps {
  enable: boolean;
  getTweets: () => void;
  tweet: any;
  likesLength: string;
}

function HeartTweet({ enable, getTweets, tweet, likesLength }: HeartTweetProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function like() {
    const userLogged = JSON.parse(localStorage.getItem('userLogged') || '{}');
    const userLike = tweet.likes.find(like => like.userId === userLogged.id);
    setLoading(true);

    if (userLike) {
      await doDel(`/like/${userLike.id}`, userLogged.token);
    } else {
      await doPost(`/like`, { tweetId: tweet.id, userId: userLogged.id }, userLogged.token);
    }

    setTimeout(() => {
      setLoading(false);
    }, 700);
    getTweets();
  }
  return (
    <>
      <button style={{ margin: '0', padding: '0' }} disabled={loading} onClick={like}>
        {!loading ? (
          <svg width="13" height="13" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_83_2222)">
              <path
                d="M0 3.08429C0.0179879 1.989 0.502097 0.988356 1.59076 0.388938C2.70444 -0.22504 3.80484 -0.0826685 4.84735 0.616248C5.50587 1.05792 5.49726 1.05631 6.13388 0.62919C7.20064 -0.0867132 8.32293 -0.238792 9.45773 0.417251C10.598 1.07572 11.054 2.14836 10.9945 3.46611C10.9445 4.58567 10.4713 5.54102 9.8347 6.41628C8.94469 7.641 7.81145 8.58826 6.56715 9.39395C5.31895 10.2021 5.67636 10.1956 4.45553 9.40771C3.16509 8.5737 1.99666 7.5868 1.08944 6.30546C0.445788 5.39541 0.00625667 4.40366 0 3.08429ZM5.48866 2.9128C5.26968 2.62725 5.1117 2.4145 4.94746 2.20741C4.68077 1.8709 4.37263 1.58616 3.99175 1.38878C2.5754 0.651841 1.11134 1.57402 1.08397 3.21534C1.07067 4.00486 1.34909 4.69326 1.75265 5.33312C2.62702 6.71963 3.86427 7.70005 5.1899 8.57774C5.38308 8.70555 5.56139 8.74196 5.76786 8.60525C7.20299 7.65071 8.5513 6.59991 9.42176 5.03058C9.77917 4.38667 9.98486 3.69908 9.90587 2.94435C9.8128 2.05129 9.25987 1.39363 8.41522 1.18816C7.59716 0.989165 6.92926 1.31355 6.35755 1.87899C6.06115 2.17182 5.81557 2.51966 5.48788 2.9128H5.48866Z"
                fill={enable ? 'red' : '#828282'}
              />
            </g>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="13" viewBox="0 0 200 200">
            <circle fill="red" stroke="red" r="15" cx="40" cy="65">
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle fill="red" stroke="red" r="15" cx="100" cy="65">
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle fill="red" stroke="red" r="15" cx="160" cy="65">
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        )}
        <p>{likesLength}</p>
      </button>
    </>
  );
}

export default HeartTweet;
