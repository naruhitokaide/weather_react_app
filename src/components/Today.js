import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import pressure from '../assets/pressure.svg'
import wind_speed from '../assets/wind_speed.svg'
import humidity from '../assets/humidity.svg'
import sunrise from '../assets/sunrise.svg'
import sunset from '../assets/sunset.svg'
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles((theme) => ({
    unit__icon: {
        width: 22,
        height:22,
        alignSelf: 'center',
        marginRight: 4,
        marginLeft: 20,
    },
    unit__icon1: {
        width: 22,
        height:22,
        alignSelf: 'center',
        fontSize: '15',
    },
    weather__icon: {
        width: 90,
        height: 90,
        Top: 0,
    },
    main : {
        overflow: 'auto',
        padding: 5,
    },
    text__left: {
        float: 'left',
    },
    text__right: {
        float: 'right',
    },
    span: {
        fontWeight: 'bold',
    }

  }));

function Today({today}) {
    const classes = useStyles();
    return (
        <CardContent>
            <div className={classes.main}>
                <div className={classes.text__left}>
                    <img src={`https://openweathermap.org/img/w/${today.icon}.png`} alt={today.icon} className={classes.weather__icon}/>
                    <Typography variant="h3" gutterBottom >
                        {today.temp}°C
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {today.main}, {today.desc}
                    </Typography>
                </div>
                <div className={classes.text__right}>
                    
                    <Typography variant="h6"gutterBottom >
                       <img src={sunrise} alt="Logo" className={classes.unit__icon}/> {today.sunrise} A.M.
                    </Typography>
                    <Typography variant="h6"gutterBottom >
                        <img src={sunset} alt="Logo" className={classes.unit__icon}/> {today.sunset} P.M.
                    </Typography>
                    
                </div>
            </div>
                <div>
                    <img src={pressure} alt="Logo" className={classes.unit__icon1}/><span className={classes.span}>{today.pressure} hPa</span>
                    <img src={humidity} alt="Logo" className={classes.unit__icon}/><span className={classes.span}>{today.humidity} %</span>
                    <img src={wind_speed} alt="Logo" className={classes.unit__icon}/><span className={classes.span}>{today.wind} m/s N</span>
                </div>
            </CardContent>    
    )
}

export default Today
