import { useEffect, useState } from 'react'
import client from '../sanityClient.js';

const HERO_IMAGE = 'https://cdn.sanity.io/images/pykxlxp8/production/175e934b0e0a408eef794e29449d0848135c3fb0-1800x1201.jpg'

export default function FAQ() {
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [openItem, setOpenItem] = useState(null)

  useEffect(() => {
    client.fetch(`
      *[_type == "page" && slug.current == "faq"][0].components[1].tabs[]{
        title,
        accordion[]{
          title,
          "answer": text[0].children[].text
        }
      }
    `).then(data => {
      if (data) setTabs(data)
    })
  }, [])

  const toggle = (key) => setOpenItem(openItem === key ? null : key)

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="FAQ"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-8 md:px-16 max-w-7xl mx-auto">
          <h1 className="text-white text-5xl md:text-7xl font-bold">FAQ</h1>
        </div>
      </div>

      {/* Tabs + Accordion */}
      <div className="max-w-4xl mx-auto px-8 md:px-16 py-24">

        {/* Tab buttons */}
        <div className="flex gap-2 mb-12 border-b border-gray-200 pb-6 flex-wrap">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => { setActiveTab(i); setOpenItem(null) }}
              className={`px-5 py-2 text-xs font-medium uppercase tracking-widest transition border
                ${activeTab === i
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'text-gray-500 border-gray-300 hover:border-gray-900 hover:text-gray-900'
                }`}>
              {tab.title}
            </button>
          ))}
        </div>

        {/* Accordion items */}
        {tabs[activeTab]?.accordion?.map((item, i) => (
          <div key={i} className="border-t border-gray-200">
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center py-5 text-left gap-4">
              <span className="text-gray-900 font-medium text-sm md:text-base">
                {item.title}
              </span>
              <span className={`text-gray-400 text-xl transition-transform duration-300 shrink-0
                ${openItem === i ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>

            {/* Answer */}
            {openItem === i && (
              <div className="pb-6">
                {item.answer?.map((para, j) => (
                  <p key={j} className="text-gray-600 leading-relaxed text-sm mb-3">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Last border */}
        <div className="border-t border-gray-200" />

      </div>
    </div>
  )
}