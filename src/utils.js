export const getId = () => {
    return Math
        .random()
        .toString(16)
        .substr(2)
}


export const images = [
    {
        src: 'https://images.pexels.com/photos/185933/pexels-photo-185933.jpeg?cs=srgb&dl=pexels-leah-kelley-185933.jpg&fm=jpg',
        title: 'El universo el origen'
    },
    {
        src: 'https://images.pexels.com/photos/7459424/pexels-photo-7459424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        title: 'El diseño tambien es arte!'
    },
    {
        src: 'https://images.pexels.com/photos/8438122/pexels-photo-8438122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        title: 'La fotogradia el mejor camino!'
    },
    {
        src: 'https://images.pexels.com/photos/5769706/pexels-photo-5769706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        title: 'La naturaleza siempre la guia'
    }
]