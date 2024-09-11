import { useParams } from 'react-router-dom';
import { doGet } from '../services/api';
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

function Comments() {
  const { id } = useParams();
  const userLogged = JSON.parse(localStorage.getItem('userLogged') || '{}');
  const tweet = { id: id, userId: id, content: 'qualquer coisa so pra' };
  const date = new Date();
  const timestamp = date.toISOString();
  const comments = [
    { id: 'xxx', content: 'bicicleta' },
    { id: 'ttt', content: 'triciclo' },
  ];

  async function getTweet() {
    const response = await doGet(`/tweet/${id}`, userLogged);
  }
  return (
    <>
      <DefaultLayout>
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
          <TextareaStyled />
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
      </DefaultLayout>
    </>
  );
}

export default Comments;
