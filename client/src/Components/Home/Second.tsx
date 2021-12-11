import 'Components/Home/scss/Second.scss';
import TagList from 'Variables/TagList';
import SearchHome from 'Variables/SearchHome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Second(props: any): JSX.Element {
  const [filterData, setFilterData] = useState<any[]>([]);
  const [clearWord, setClearWord] = useState('');

  const FilterOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setClearWord(searchWord);
    const newFilter = props.data.filter((value: any) => {
      return value.class.includes(searchWord);
    });
    setFilterData(newFilter);
  };

  const clearInput = () => {
    setFilterData([]);
    setClearWord('');
  };

  useEffect(() => {}, [props]);

  return (
    <section className="Second__Container">
      <div className="Second__Wrapper">
        <div className="Tag-Container">
          {TagList.map((value: any) => (
            <button
              key={value.id}
              className="Crops__Tag"
              onClick={() => {
                const searchWord = value.class;
                setClearWord(searchWord);
                const newFilter = SearchHome.filter((value: any) => {
                  return value.class.includes(searchWord);
                });
                setFilterData(newFilter);
              }}
            >
              # {value.class}
            </button>
          ))}
        </div>

        <div className="HSearch__Container">
          <div className="HSearch__Input">
            <input
              className="Hsearch__Bar"
              type="text"
              value={clearWord}
              placeholder="작물의 이름을 검색해보세요.   해시태그를 눌러도 가능합니다!"
              onChange={FilterOnChangeHandler}
            />
            {clearWord.length === 0 ? (
              <FontAwesomeIcon icon={faSearch} className="HSearch__Icon" />
            ) : (
              <FontAwesomeIcon
                icon={faTimes}
                className="HClose__Icon"
                onClick={clearInput}
              />
            )}
          </div>
          {filterData.length !== 0 && clearWord.length !== 0 && (
            <div className="Data__Result">
              {filterData.map(option => (
                <Link
                  key={option.id}
                  to={`/Dictionary?name=${option.name}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <div className="Data__Item">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="Search__Sub-Icon"
                    />
                    {option.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
