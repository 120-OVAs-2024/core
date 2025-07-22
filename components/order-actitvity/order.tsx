import { Children, FC, useReducer, useState } from 'react';
import { DragAndDropProps } from 'books-ui';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useOvaContext } from '@/context/ova-context';

import { InitialState } from './types/types';
import { defaultAnnouncements, i18n } from './const';
import { OrderButton } from './order-buttons';
import { OrderActivityProvider, useOrderActivityContext } from './order-context';

import css from './order.module.css';

const INITIAL_STATE: InitialState = {
  validation: false,
  button: true,
  result: false
};

interface Props extends DragAndDropProps {
  itemsIniciales: { id: string; order: number; text: string }[];
  onResult?: ({ result }: { result: boolean }) => void;
}

type SubComponents = {
  Button: typeof OrderButton;
};

// Contenedor principal
const OrderActivity: FC<Props> & SubComponents = ({
  itemsIniciales,
  children,
  announcements = defaultAnnouncements,
  onResult
}: Props) => {
  const { lang } = useOvaContext();
  const [activity, updatedActivity] = useReducer(
    (prev: InitialState, next: Partial<InitialState>) => ({ ...prev, ...next }),
    INITIAL_STATE
  );

  const [items, setItems] = useState(itemsIniciales);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      updatedActivity({ button: false });
    }
  };

  const SortableRow = ({ id, text }: { id: string; text: string }) => {
    const { result, validation } = useOrderActivityContext();

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id,
      data: { label: text }
    });

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1
    };

    let extraClass = '';
    if (validation) {
      extraClass = result ? css['sortable-item--success'] : css['sortable-item--error'];
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        aria-label={`Elemento: ${text}`}
        {...attributes}
        {...(!validation ? listeners : {})}
        className={`${css['sortable-item']} ${extraClass} ${validation ? css['no-grab'] : ''}`}>
        <span>
          <i>{text}</i>
        </span>
        <div className={css['sortable-item__arrows']}>
          <p>▲</p>
          <p>▼</p>
        </div>
      </div>
    );
  };

  const handleValidation = () => {
    const result = items.every((item, index) => item.order === index + 1);
    updatedActivity({
      validation: true,
      button: true,
      result
    });
    if (onResult) onResult({ result });
  };

  const handleReset = () => {
    setItems(itemsIniciales);
    updatedActivity(INITIAL_STATE);
  };

  return (
    <OrderActivityProvider value={{ handleValidation, handleReset, ...activity }}>
      <div style={{ marginTop: '1rem' }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          accessibility={{
            announcements: announcements,
            screenReaderInstructions: {
              draggable: i18n[lang].screenReaderInstruction
            }
          }}>
          <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {items.map((item) => (
                <SortableRow key={item.id} id={item.id} text={item.text} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      {Children.map(children, (child) => child)}
    </OrderActivityProvider>
  );
};

OrderActivity.Button = OrderButton;

export { OrderActivity };
