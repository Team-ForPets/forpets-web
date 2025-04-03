import React, { useEffect, useState } from 'react';
import mypageApi from '../../api/mypageApi';
import VolunteerCard from './VolunteerCard';
function VolunteerCardList() {
  const [myVolunteerPost, setMyVolunteerPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await mypageApi.getMyVolunteerPost();
        console.log('응답 데이터', response);
        setMyVolunteerPost(response.data.data.posts || []);
      } catch (err) {
        console.error(err);
        console.log('데이터를 읽어오지 못했습니다.');
        setMyVolunteerPost([]);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="flex justify-center overflow-y-auto h-full">
      {/* 내 봉사자 카드 렌더링 */}
      <ul>
        {myVolunteerPost.length > 0 ? (
          myVolunteerPost.map((post) => <VolunteerCard key={post.id} myVolunteerPost={post} />)
        ) : (
          <li>정보가 없습니다.</li>
        )}
      </ul>
    </section>
  );
}

export default VolunteerCardList;
