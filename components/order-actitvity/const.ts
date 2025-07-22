import type { Announcements } from '@dnd-kit/core';


// Constantes para las etiquetas de navegación en múltiples idiomas
export const i18n = {
  es: {
    screenReaderInstruction:
      'Si usas un lector de pantalla, desactiva el mouse virtual (insert+Z). Para seleccionar un elemento arrastrable, presiona la barra espaciadora o la tecla Enter. Mientras mantienes seleccionado, usa las teclas de flecha para mover el elemento en cualquier dirección deseada. Presiona nuevamente la barra espaciadora o la tecla Enter para soltar el elemento en su nueva posición, o presiona Escape para cancelar.'
  },
  en: {
    screenReaderInstruction:
      'If you use a screen reader, disable the virtual mouse. To pick up a draggable item, press the spacebar or the Enter key. While dragging, use the arrow keys to move the item in any desired direction. Press the spacebar or the Enter key again to drop the item in its new position, or press Escape to cancel.'
  }
};

export const defaultAnnouncements: Announcements = {
  onDragStart({ active }) {
    return `Se ha seleccionado la opción ${active.id}.`;
  },
  onDragOver({ active, over }) {
    if (over) {
      return `La opción ${active.id} se movió sobre ${over.id}.`;
    }
    return `La opción ${active.id} ya no está sobre una opción válida.`;
  },
  onDragEnd({ active, over }) {
    if (over) {
      return `La opción ${active.id} se soltó sobre ${over.id}.`;
    }
    return `La opción ${active.id} se eliminó.`;
  },
  onDragCancel({ active }) {
    return `Se canceló la selección. La opción ${active.id} se eliminó.`;
  },
};

