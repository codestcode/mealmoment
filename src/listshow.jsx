import ReactMarkdown from "react-markdown"
import React from 'react';

export default function ListShow(prop) {
   return  (
<section className="ai-generated">
   <ReactMarkdown>{prop.ishown}</ReactMarkdown>
   </section> ) }