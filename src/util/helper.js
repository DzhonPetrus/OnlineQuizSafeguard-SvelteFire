import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const humanizedFBDateTime = (dt) => dayjs(dt.toDate()).fromNow();
export const humanizedDateTime = (dt) => dayjs(dt).fromNow();


export const checkEmptyArray = (OBJ, OBJKEY) => (OBJ.length !== 0) ? OBJKEY : '';

export const shuffleArray = arr => arr.sort( () => .5 - Math.random() );
