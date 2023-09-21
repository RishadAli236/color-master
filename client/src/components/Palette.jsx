import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Palette = (props) => {
    const {id} = useParams();

    if (id){
    const [hexPalette, setHexPalette] = useState({color1:"", color2:"", color3:"", color4:"", color5:""})
    const [RGBPalette, setRGBPalette] = useState({color1:"", color2:"", color3:"", color4:"", color5:""})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/palettes/${id}`, {withCredentials: true})
        .then(res => {
            console.log(res.data)
            const color1Hex = `#${res.data.color1.r.toString(16)}${res.data.color1.g.toString(16)}${res.data.color1.b.toString(16)}`
            const color2Hex = `#${res.data.color2.r.toString(16)}${res.data.color2.g.toString(16)}${res.data.color2.b.toString(16)}`
            const color3Hex = `#${res.data.color3.r.toString(16)}${res.data.color3.g.toString(16)}${res.data.color3.b.toString(16)}`
            const color4Hex = `#${res.data.color4.r.toString(16)}${res.data.color4.g.toString(16)}${res.data.color4.b.toString(16)}`
            const color5Hex = `#${res.data.color5.r.toString(16)}${res.data.color5.g.toString(16)}${res.data.color5.b.toString(16)}`
            setHexPalette({
                color1: color1Hex,
                color2: color2Hex,
                color3: color3Hex,
                color4: color4Hex,
                color5: color5Hex
            })
        })
    }, [])
    
    const handleOnChange = (e) => {
        console.log(e)
        setHexPalette({...hexPalette, [e.target.name] : e.target.value})
        setRGBPalette({
            ...RGBPalette, [
            e.target.name] : {
                r : parseInt(e.target.value.substring(1,3), 16),
                g : parseInt(e.target.value.substring(3,5), 16),
                b : parseInt(e.target.value.substring(5,7), 16)
            }
        })
    } 

    const addPalette = (e) => {
        e.preventDefault();
        axios.patch("http://localhost:8000/api/palettes", RGBPalette, {withCredentials: true})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return(
        <div>
            <form onSubmit={addPalette}>
                <input type="color" name="color1" value={hexPalette.color1} onChange={handleOnChange} />
                <input type="color" name="color2" value={hexPalette.color2}onChange={handleOnChange}/>
                <input type="color" name="color3" value={hexPalette.color3}onChange={handleOnChange}/>
                <input type="color" name="color4" value={hexPalette.color4}onChange={handleOnChange}/>
                <input type="color" name="color5" value={hexPalette.color5}onChange={handleOnChange}/>
                <input type="submit" value="Edit Palette" />
            </form>
        </div>
    )
    }
    else{
        const [hexPalette, setHexPalette] = useState({color1:"", color2:"", color3:"", color4:"", color5:""})
    const [RGBPalette, setRGBPalette] = useState({color1:"", color2:"", color3:"", color4:"", color5:""})
    const handleOnChange = (e) => {
        console.log(e)
        setHexPalette({...hexPalette, [e.target.name] : e.target.value})
        setRGBPalette({
            ...RGBPalette, [
            e.target.name] : {
                r : parseInt(e.target.value.substring(1,3), 16),
                g : parseInt(e.target.value.substring(3,5), 16),
                b : parseInt(e.target.value.substring(5,7), 16)
            }
        })
    } 

    const addPalette = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/palettes", RGBPalette, {withCredentials: true})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return(
        <div>
            <form onSubmit={addPalette}>
                <input type="color" name="color1" value={hexPalette.color1} onChange={handleOnChange} />
                <input type="color" name="color2" onChange={handleOnChange}/>
                <input type="color" name="color3" onChange={handleOnChange}/>
                <input type="color" name="color4" onChange={handleOnChange}/>
                <input type="color" name="color5" onChange={handleOnChange}/>
                <input type="submit" value="Create Palette" />
            </form>
        </div>
    )
    }
};

export default Palette;