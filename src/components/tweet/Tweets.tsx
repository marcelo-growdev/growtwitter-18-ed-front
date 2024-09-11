import TweetStyled from './TweetStyled';
import { doGet } from '../../services/api';
import commentTweet from '../../../public/icone_responder.svg';
import TweetDivStyled from './TweetDivStyled';
import HeartTweet from './HeartTweet';
import Avatar from '../Avatar';
import { useContext, useEffect, useState } from 'react';
import { TweetContext } from '../../contexts/TweetsContext';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TweetType from '../../types/TweetType';
import { Link } from 'react-router-dom';

interface TweetsProps {
  user: boolean;
}

function Tweets({ user }: TweetsProps) {
  const tweetContext = useContext(TweetContext);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const date = new Date();
  const timestamp = date.toISOString();

  const userLogged = JSON.parse(localStorage.getItem('userLogged') || '{}');

  async function getTweets() {
    const response = await doGet(`/tweet/${user ? userLogged.id : ''}`, `${userLogged.token}`);

    if (response.success) {
      setTweets(response.data);
    }
  }

  useEffect(() => {
    if (userLogged.token) {
      getTweets();
    }
  }, []);

  useEffect(() => {
    getTweets();
  }, [tweetContext]);

  return (
    <>
      <TweetStyled>
        {tweets.map(item => {
          return (
            <TweetDivStyled key={item.id}>
              <Avatar useBorder={false} useWidth={true} src={item.userId.replace(/[^0-9\.]+/g, '')} />
              <div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <b>{item.user.name}</b>
                  <p>
                    @{item.user.username} • {formatDistance(item.createdAt, timestamp, { locale: ptBR })}
                  </p>
                </div>
                <p>{item.content}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button>
                    <Link to={`/tweet/${item.id}`} style={{ height: '13px' }}>
                      <img src={commentTweet} alt="comment-tweet" />
                    </Link>
                    <p>0</p>
                  </button>
                  <HeartTweet
                    getTweets={getTweets}
                    tweet={item}
                    enable={item.likes.find(like => like.userId === userLogged.id) ? true : false}
                    likesLength={`${item.likes.length}`}
                  />
                </div>
              </div>
            </TweetDivStyled>
          );
        })}
      </TweetStyled>
    </>
  );
}
export default Tweets;
