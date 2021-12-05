import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//@ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import Modal from 'Components/Dictionary/DictionaryModal';
import 'Components/Dictionary/scss/DictionaryList.scss';

export default function DictionaryList(props: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  useEffect(() => {
    AOS.init();
  });

  useEffect(() => {
    const current_url = window.location.href.includes('?name=');
    const disease_name = decodeURI(window.location.href.split('=')[1]);
    if (!props.data) {
      return;
    }
    if (current_url) {
      const need = props.data.filter((val: any) => val.name === disease_name);
      setModalData(need[0]);
      setModalOpen(true);
    }
  }, [props.data]);

  return (
    <>
      <div className="Search__Result">
        {props.data &&
          props.data.map((value: any) => (
            <Link
              data-aos="fade-up"
              data-aos-duration="800"
              style={{ textDecoration: 'none' }}
              to={window.location.pathname + `?name=${value.name}`}
              key={value.id}
              className="CropsList__Wrapper"
              onClick={() => {
                setModalData(value);
                setModalOpen(true);
                document.body.style.overflow = 'hidden';
              }}
            >
              <span className="CropList__Hover-Text">정보 확인</span>
              <div className="CropsList__Container-Box">
                <img
                  className="CropsList__Image"
                  src={value.image}
                  alt="crops"
                />
                <div className="CropsList__Classification">
                  <div className="Classification__Name">{value.crops_id}</div>
                </div>
                <div className="CropsList__Name">{value.name}</div>
              </div>
            </Link>
          ))}
      </div>
      {modalOpen && <Modal setOpenModal={setModalOpen} data={modalData} />}
    </>
  );
}
