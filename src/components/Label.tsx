import React from 'react'

export default function Label(
  props: React.LabelHTMLAttributes<HTMLLabelElement>
) {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {props.children}
    </label>
  )
}
