import { Audio } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';

import type { ModalCoreProps } from '../modal/modal';
import { Modal } from '../modal/modal';

import { i18n } from './consts';

import css from './modal-credits.module.css';

interface Props extends ModalCoreProps {
  addClass?: string;
  school: string;
  course?: string;
  teachers: string[];
  audio?: string;
  lang?: 'es'
}

export const ModalCredits: React.FC<Props> = ({ addClass, school, teachers, audio, course, lang: langProp, ...props }) => {
  const { lang } = useOvaContext();

  return (
    <Modal {...props} addClass={`${css['modal']} u-py-4 ${addClass ?? ''}`}>
      <div className="u-flow u-text-center">
        <h2>{i18n[lang].title}</h2>
        <p>Vicerrectoría de Medios y Mediaciones Pedagógicas - VIMEP</p>
        <p>Red de Gestión Tecnopedagógica de Cursos y Recursos Educativos Digitales</p>
        <p>{school}</p>
        {course && <p>{course}</p>}
        {teachers.map((teacher, index) => (
          <Teacher key={`${index}-teacher`} teacher={teacher} />
        ))}
        <p>2024</p>
        <p>UNAD</p>
        <p className="u-font-bold u-font-italic">“{i18n[langProp || lang].license}”</p>
        {audio ? <Audio src={audio} /> : null}
      </div>
    </Modal>
  );
};

const Teacher = ({ teacher }: { teacher: string }) => (
  <p>
    <strong>{teacher}</strong>
  </p>
);
