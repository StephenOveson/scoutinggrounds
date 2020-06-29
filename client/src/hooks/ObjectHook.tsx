import { useState, ChangeEvent, useEffect } from 'react';
import { useRecoilState, RecoilState, useResetRecoilState } from 'recoil';

export const useObject = <T extends object>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  return {
    value,
    setValue,
    bindProperty: <K extends keyof T>(property: K) => ({
      value: value[property],
      name: property,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValue({...value, [event.target.name]: ((typeof value[property] === 'number') ? parseInt(event.target.value) || 0 : event.target.value) })
    }),
    bindPropertyCheck: <K extends keyof T>(property: K) => ({
      checked: value[property],
      name: property,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setValue({...value, [event.target.name]: (event.target.checked) })
    }),
    updateProperty: <K extends keyof T>(property: K) => {let temp = value[property]; return <V extends typeof temp>(data: V, callback?: (arg0: T) => any) => {
      setValue((prevValue) => {
        const newValue = {...prevValue, [property]: data}
        callback && callback(newValue)
        return newValue
      })
    }
    },
    reset: () => setValue(initialValue)
  }
}

export const useRecoilObject = <T extends object>(atom: RecoilState<T>, initialValue?: T) => {
  const [value, setValue] = useRecoilState(atom);
  const resetValue = useResetRecoilState(atom);

  useEffect(() => {
    initialValue && setValue(initialValue)
  },[])

  return {
    value,
    setValue,
    bindProperty: <K extends keyof T>(property: K) => ({
      value: value[property],
      name: property,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValue({...value, [event.target.name]: ((typeof value[property] === 'number') ? parseInt(event.target.value) || 0 : event.target.value) })
    }),
    bindPropertyCheck: <K extends keyof T>(property: K) => ({
      checked: value[property],
      name: property,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setValue({...value, [event.target.name]: (event.target.checked) })
    }),
    updateProperty: <K extends keyof T>(property: K) => {let temp = value[property]; return <V extends typeof temp>(data: V, callback?: Function) => {
      setValue((prevValue) => {
        const newValue = {...prevValue, [property]: data}
        callback && callback(newValue)
        return newValue
      })
    }
    },
    reset: () => initialValue ? setValue(initialValue) : resetValue()
  }
}