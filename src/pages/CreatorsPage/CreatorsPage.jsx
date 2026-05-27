import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreators } from '../../redux/creators/operations';
import Container from '../../components/Container/Container';
import css from './CreatorsPage.module.css';

const CreatorsPage = () => {
  const dispatch = useDispatch();
  const creators = useSelector(state => state.creators.items);

  const isLoading = useSelector(state => state.creators.isLoading);

  useEffect(() => {
    dispatch(fetchCreators());
  }, [dispatch]);

  const BASE_URL = 'https://harmoniq-back.onrender.com/';
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  return (
    <main className={css.page}>
      <Container>
        <h1 className={css.title}>Authors</h1>
        {isLoading && <p>Loading authors...</p>}

        <ul className={css.grid}>
          {creators.map(({ _id, username, avatarURL }) => (
            <li key={_id} className={css.item}>
              <div className={css.avatarWrapper}>
                <img
                  src={
                    avatarURL
                      ? avatarURL.startsWith('http')
                        ? avatarURL
                        : `${BASE_URL}${avatarURL}`
                      : defaultAvatar
                  }
                  alt={username}
                  className={css.avatar}
                />
              </div>
              <p className={css.username}>{username}</p>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
};

export default CreatorsPage;
