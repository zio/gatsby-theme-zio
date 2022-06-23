import * as React from "react"

interface Sponsor {
  image: string,
  imageAlt: string,
  imageLink: string,
  content: string
}

const sponsors : Array<Sponsor> = [
  {
    image: '/img/ziverge.png',
    imageAlt: 'Ziverge',
    imageLink: 'https://ziverge.com',
    content: 'Brilliant solutions for innovative companies'
  },
  {
    image: `/img/scalac.svg`,
    imageAlt: 'Scalac',
    imageLink: 'https://scalac.io/',
    content: 'Scale fast with Scala'
  },
  {
    image: `/img/septimal_mind.svg`,
    imageAlt: 'Septimal Mind',
    imageLink: 'https://7mind.io/',
    content: 'Inventing productivity'
  },
  {
    image: `https://files.softwaremill.com/logo/logo_vertical.png`,
    imageAlt: 'SoftwareMill',
    imageLink: 'https://softwaremill.com/',
    content: 'Custom software by true engineers'
  },
];

const Sponsors = () => { 
  const elems = sponsors.map( (s) => {
    return (
      <div className="m-4">
        <div className="container w-80 h-40 m-auto flex place-content-center">
          <a href={s.imageLink} className="flex flex-col place-content-center">
            <img src={s.image} alt={s.imageAlt} className="flex-none w-full h-auto"/>
          </a>
        </div>
        <p className="text-center text-xl font-semibold mx-auto mt-2">{s.content}</p>
      </div>
    )
  })

  return(
    <div className="container m-auto grid grid-cols-1 md:grid-cols-2 pb-4">
      {elems}
    </div>
  )
}

export default Sponsors