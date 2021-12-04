import 'Components/Home/scss/Third.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CropsName from 'Assets/Dummy/CropsName.js';
import ThridDummy from 'Assets/Dummy/Thrid.js';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Third(props: any): JSX.Element {
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
    <section className="Third__Container">
      <div className="Third__Subcontainer">
        <div className="Tag-Container">
          {CropsName.map((value: any) => (
            <button
              key={value.id}
              className="Crops__Tag"
              onClick={() => {
                const searchWord = value.class;
                setClearWord(searchWord);
                const newFilter = ThridDummy.filter((value: any) => {
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
              type="text"
              value={clearWord}
              placeholder="작물의 이름을 검색해주세요"
              onChange={FilterOnChangeHandler}
            />
            {filterData.length === 0 ? (
              <FontAwesomeIcon icon={faSearch} className="HSearch__Icon" />
            ) : (
              <FontAwesomeIcon
                icon={faTimes}
                className="HClose__Icon"
                onClick={clearInput}
              />
            )}
          </div>
          {filterData.length !== 0 && (
            <div className="Data__Result">
              {filterData.map(option => (
                <Link
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
