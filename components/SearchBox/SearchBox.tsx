"use client";
import type { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface Props { text: string; onSearch: (v: string) => void; }
export default function SearchBox({ text, onSearch }: Props) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value);
  return <input className={css.input} placeholder="Search notes" value={text} onChange={onChange} />;
}
