import Brands from "@/app/components/Brands";
import { Str } from "./consts";

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function hashValue(val) {
  var hash = 0,
    i,
    chr;

  if (val.length === 0) return hash;
  for (i = 0; i < val.length; i++) {
    chr = val.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export const getAvatar = (type) => {
  switch (type) {
    case 'streaming':
      return <div className='w-14 px-3'>
        <Brands brands={[...Str.brands].splice(0, 4)} size='smaller' />
      </div>
    case 'yt_automation':
      return <div className='w-20 px-3'>
        <Brands brands={[...Str.brands].splice(7, 1)} size='small' />
      </div>
    case 'forex':
      return <div className='w-20 px-3'>
        <Brands brands={[...Str.brands].splice(8, 1)} size='small' />
      </div>
    case 'phone':
      return <div className='w-20 px-3'>
        <Brands brands={[...Str.brands].splice(10, 1)} size='small' />
      </div>
    case 'skills':
      return <div className='w-20 px-3'>
        <Brands brands={[...Str.courseBrands].splice(0, 1)} size='small' />
      </div>
    case 'utilities':
      return <div className='w-14 px-3'>
        <Brands brands={[...Str.utilityBrands].splice(0, 4)} size='smaller' />
      </div>
    case 'smm':
      return <div className='w-20 px-3'>
        <Brands brands={[...Str.brands].splice(9, 1)} size='small' />
      </div>

    default:
      break;
  }
}
