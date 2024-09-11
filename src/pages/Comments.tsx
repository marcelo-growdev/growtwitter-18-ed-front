import { useParams } from 'react-router-dom';
import { doGet, doPost } from '../services/api';
import DefaultLayout from '../config/layout/DefaultLayout';
import TweetStyled from '../components/tweet/TweetStyled';
import TweetDivStyled from '../components/tweet/TweetDivStyled';
import Avatar from '../components/Avatar';
import { formatDistance } from 'date-fns';
import commentTweet from '/icone_responder.svg';
import HeartTweet from '../components/tweet/HeartTweet';
import { ptBR } from 'date-fns/locale';
import TextareaStyled from '../components/comments/TextareaStyled';
import TextContainer from '../components/comments/TextContainer';
import { useEffect, useState } from 'react';
import ButtonDefault from '../components/button/ButtonDefault';
import { CircularProgress } from '@mui/material';

function Comments() {
  const { id } = useParams();
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const userLogged = JSON.parse(localStorage.getItem('userLogged') || '{}');
  const date = new Date();
  const timestamp = date.toISOString();

  const tweet = { id: id, userId: id, content: 'qualquer coisa so pra' };
  const comments = [
    { id: 'xxx', content: 'bicicleta' },
    { id: 'ttt', content: 'triciclo' },
  ];

  async function getTweet() {
    const response = await doGet(`/tweet/${id}`, `${userLogged.token}`);
  }

  async function postComment() {
    await doPost(`/reply`, { tweetId: id, content: text }, `${userLogged.token}`);
  }
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <DefaultLayout>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TweetStyled>
              <h1>COMENTARIOS</h1>
              <TweetDivStyled>
                <Avatar useBorder={false} useWidth={true} src={tweet.userId?.replace(/[^0-9\.]+/g, '') || ''} />
                <div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <b>aqui vai o nome do usuario</b>
                    <p>@UserName • {formatDistance(timestamp, timestamp, { locale: ptBR })}</p>
                  </div>
                  <p>{tweet.content}</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button>
                      <img src={commentTweet} alt="comment-tweet" />
                      <p>0</p>
                    </button>
                    {/* <HeartTweet
                  getTweets={getTweets}
                  tweet={item}
                  enable={item.likes.find(like => like.userId === userLogged.id) ? true : false}
                  likesLength={`${item.likes.length}`}
                /> */}
                  </div>
                </div>
              </TweetDivStyled>
            </TweetStyled>
            <TextContainer>
              <Avatar useBorder={false} useWidth={true} src={tweet.userId?.replace(/[^0-9\.]+/g, '') || ''} />
              <TextareaStyled
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Digite seu comentario aqui"
              />
              <ButtonDefault bigButton={false} lessRound={true} label="Comentar" action={postComment} />
            </TextContainer>
            <TweetStyled>
              {comments.map(item => {
                return (
                  <TweetDivStyled key={item.id}>
                    <Avatar useBorder={false} useWidth={true} src={tweet.userId?.replace(/[^0-9\.]+/g, '') || ''} />
                    <div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <b>aqui vai o nome do usuario</b>
                        <p>@UserName • {formatDistance(timestamp, timestamp, { locale: ptBR })}</p>
                      </div>
                      <p>{item.content}</p>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button>
                          <img src={commentTweet} alt="comment-tweet" />
                          <p>0</p>
                        </button>
                        {/* <HeartTweet
                          getTweets={getTweets}
                          tweet={item}
                          enable={item.likes.find(like => like.userId === userLogged.id) ? true : false}
                          likesLength={`${item.likes.length}`}
                        /> */}
                      </div>
                    </div>
                  </TweetDivStyled>
                );
              })}
            </TweetStyled>
          </>
        )}
      </DefaultLayout>
    </>
  );
}

export default Comments;
