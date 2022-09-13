import React from 'react'
import { Avatar, Badge, Grid, ListItem } from '@mui/material'
import SquareButton from '../components/SquareButton';
import validator from "validator";
import { addNewChat } from '../../../components/store/chats/thunks';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from '../../../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { PersonAdd } from '@mui/icons-material';




const MainView = () => {

    const dispatch = useDispatch();
    const { email } = useSelector(state => state.auth)
    const [snapshot] = useCollection(collection(db, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));


    const chatExists = mail => chats?.find(chat => (chat.users.includes(email) && chat.users.includes(mail)));


    const handleAddChat = () => {

        Swal.fire({
            title: "Type the email and start chatting!",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Add a friend',
        }).then((result) => {
            if (result.isConfirmed) {
                if (validator.isEmail(result.value)) {
                    if (!chatExists(result.value) && result.value !== email) {
                        dispatch(addNewChat(result.value));
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'You already have a chat with this person!',
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This is not a valid email!',
                    })
                }
            }
        })


    }




    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', padding: 3, borderRadius: 3 }}

        >
            <Grid item flexDirection={'row'} display={'flex'} flex={1} justifyContent={'space-evenly'} borderRadius={3} backgroundColor={''} padding={4} marginRight={2}>

                <Grid item flex={1} display='flex' sx={{ backgroundColor: 'secondary.main' }} borderRadius={10} xs={12} md={3} >
                    <Grid container padding={4} flexWrap={'wrap'} overflow='hidden'>

                        <Grid container justifyContent={'space-around'} alignItems='center' >
                            <SquareButton text={'Edit profile'} color='aqua' />
                            <SquareButton text={'Add a friend'} color='aqua' callback={() => { handleAddChat() }} Icon={() => <PersonAdd color='warning' />} />
                        </Grid>

                        <Grid container justifyContent={'center'} >
                            <SquareButton text={'Boton'} size={325} color='aqua' />
                            <SquareButton text={'Boton'} size={325} color='aqua' />
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item flex={1} display='flex' justifyContent={'center'} sx={{ backgroundColor: 'secondary.main' }} borderRadius={10} xs={12} sm={8} md={8}>
                    <Grid container flexWrap={'wrap'} overflow='hidden' >


                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} borderRadius={10}>
                            <Grid item xs={6} backgroundColor='red'>
                                <ListItem>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant='standard'
                                        badgeContent={'Active'}
                                        color='green'
                                    >
                                        <Avatar sx={{ width: 150, height: 150}} variant="circular" src={'https://scontent.fhmo1-2.fna.fbcdn.net/v/t1.6435-9/83199889_1670786533069331_2259789131460640768_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFx-tMMRfMLpiK6O3cikKqaIvZA45PrVKsi9kDjk-tUq05DAQsw6t56d1A4t23MO_0CakIYolf7GgTlyCqpqmOv&_nc_ohc=Lsq2nhDvYqcAX-oOOTT&tn=CvMj8-1limFiBwgH&_nc_ht=scontent.fhmo1-2.fna&oh=00_AT_3-YRhVIxYsp1UhyL-7WmiX2Ihglex6Q1e-Kuihb-H8g&oe=634685F8'} />

                                    </Badge>
                                </ListItem>
                            </Grid>
                            <Grid item xs={6} backgroundColor='blue'>
                                <ListItem>
                                    <Avatar sx={{ width: 200, height: 200 }} variant="circular" src={'https://scontent.fhmo1-2.fna.fbcdn.net/v/t1.6435-9/83199889_1670786533069331_2259789131460640768_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFx-tMMRfMLpiK6O3cikKqaIvZA45PrVKsi9kDjk-tUq05DAQsw6t56d1A4t23MO_0CakIYolf7GgTlyCqpqmOv&_nc_ohc=Lsq2nhDvYqcAX-oOOTT&tn=CvMj8-1limFiBwgH&_nc_ht=scontent.fhmo1-2.fna&oh=00_AT_3-YRhVIxYsp1UhyL-7WmiX2Ihglex6Q1e-Kuihb-H8g&oe=634685F8'} />

                                </ListItem>
                            </Grid>
                            <Grid item xs={6} backgroundColor='green'>
                                <ListItem>
                                    <Avatar sx={{ width: 200, height: 200 }} variant="circular" src={'https://scontent.fhmo1-2.fna.fbcdn.net/v/t1.6435-9/83199889_1670786533069331_2259789131460640768_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFx-tMMRfMLpiK6O3cikKqaIvZA45PrVKsi9kDjk-tUq05DAQsw6t56d1A4t23MO_0CakIYolf7GgTlyCqpqmOv&_nc_ohc=Lsq2nhDvYqcAX-oOOTT&tn=CvMj8-1limFiBwgH&_nc_ht=scontent.fhmo1-2.fna&oh=00_AT_3-YRhVIxYsp1UhyL-7WmiX2Ihglex6Q1e-Kuihb-H8g&oe=634685F8'} />

                                </ListItem>
                            </Grid>
                            <Grid item xs={6} backgroundColor='yellow'>
                                <ListItem>
                                    <Avatar sx={{ width: 200, height: 200 }} variant="circular" src={'https://scontent.fhmo1-2.fna.fbcdn.net/v/t1.6435-9/83199889_1670786533069331_2259789131460640768_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFx-tMMRfMLpiK6O3cikKqaIvZA45PrVKsi9kDjk-tUq05DAQsw6t56d1A4t23MO_0CakIYolf7GgTlyCqpqmOv&_nc_ohc=Lsq2nhDvYqcAX-oOOTT&tn=CvMj8-1limFiBwgH&_nc_ht=scontent.fhmo1-2.fna&oh=00_AT_3-YRhVIxYsp1UhyL-7WmiX2Ihglex6Q1e-Kuihb-H8g&oe=634685F8'} />

                                </ListItem>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>




            </Grid>

        </Grid>
    )
}

export default MainView