import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommunityApi } from 'API/CommunityApi';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet-async';
import Disqus from 'disqus-react';
import Navigation from 'Components/Common/Navigation';
import ProgressBar from 'Components/Common/ProgressBar';
import 'Components/Community/scss/Board.scss';

library.add(faEye);

export default function Board(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;
  const [data, setData] = useState<any>();
  const [isAuthor, setIsAuthor] = useState<Boolean>(false);
  const modifyProps = [data, item];
  const [cookies, setCookie] = useCookies(['plant-blog']);

  // 게시글 번호에 맞는 글 불러오기
  useEffect(() => {
    async function getPost() {
      await CommunityApi.Get_Page(`blog/${item}`, `${cookies['plant-blog']}`)
        .then(response => {
          if (response.data.new_token !== null) {
            localStorage.removeItem('access_token');
            localStorage.setItem('access_token', response.data.new_token);
            setData(response.data);
            setIsAuthor(response.data.is_author);
            setCookie('plant-blog', item);
          } else {
            setData(response.data);
            setIsAuthor(response.data.is_author);
            setCookie('plant-blog', item);
          }
        })
        .catch(error => {
          if (error.response.data === 'Security Warning') {
            localStorage.removeItem('access_token');
            navigate('/');
            toast.error('해킹이 감지되었습니다.', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
    getPost();
  }, [item]);

  // 게시글 삭제
  async function onDeleteHandler() {
    if (isAuthor === true) {
      let reconfirmMessage: string | null = prompt(
        '"삭제"를 입력하시면 글이 삭제됩니다.',
      );

      if (reconfirmMessage === '삭제') {
        try {
          await CommunityApi.Community_Post(`blog/delete/${item}`, '')
            .then(response => {
              if (response.data.new_token !== null) {
                localStorage.removeItem('access_token');
                localStorage.setItem('access_token', response.data.new_token);
                navigate('/community');
              } else {
                navigate('/community');
              }
            })
            .catch(error => {
              if (error.response.data === 'Security Warning') {
                localStorage.removeItem('access_token');
                navigate('/');
                toast.error('해킹이 감지되었습니다.', {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            });
        } catch (e) {
          toast.error('본인만 삭제할 수 있습니다.', {
            autoClose: 2500,
          });
        }
      } else {
        toast.info('삭제가 취소되었습니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2500,
        });
      }
    } else {
      toast.error('본인만 삭제할 수 있습니다.', {
        autoClose: 2500,
      });
    }
  }

  // 게시글 수정 페이지 이동
  async function onModifyHandler() {
    if (isAuthor) {
      navigate('/community/post', { state: modifyProps });
    } else {
      toast.error('본인만 수정할 수 있습니다.', {
        autoClose: 2500,
      });
    }
  }

  // DISQUS
  const disqusShortname = 'plantit';
  const disqusConfig = {
    url: `https://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/community/${item}`,
    identifier: `${item}`,
    title: `댓글_${item}`,
  };
  return (
    <>
      <section className="Board__Container">
        <Helmet>
          <title>{data && data.title}</title>
        </Helmet>
        <Navigation />
        <ProgressBar />
        <div className="Board__Top">
          <div className="Board__Information">
            <h1>{data && data.upload_date}</h1>
            <h1>
              <FontAwesomeIcon icon={faEye} /> {data && data.view}
            </h1>
          </div>
        </div>
        <div className="Board__Contents-Wrapper">
          <h1 className="Board__Title">{data && data.title}</h1>
          <div
            className="Board__Contents"
            dangerouslySetInnerHTML={{ __html: data && data.content }}
          ></div>
        </div>
        <button
          className="Board__Back"
          // eslint-disable-next-line no-sequences
          onClick={() => (window.scrollTo(0, 0), navigate('/community'))}
        >
          뒤로 가기
        </button>
        <div className="Board__Profile">
          <div className="Board__Profile-Wrapper">
            <img
              src={data && data.author_image + '?t=' + new Date().getTime()}
              alt=""
            />
            <div className="Board__Profile-Info">
              <h1>
                <span>editor. </span>
                {data && data.author}
              </h1>
              <span>{data && data.author_desc}</span>
            </div>
          </div>
        </div>
        <div className="Board__Modify__Delete">
          <button className="Board__Delete" onClick={onDeleteHandler}>
            삭제
          </button>
          <button className="Board__Modify" onClick={onModifyHandler}>
            수정
          </button>
        </div>
        <div className="disqusFrame">
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      </section>
    </>
  );
}
