import React from 'react'
import { Grid } from '@mui/material'
import SquareButton from '../components/SquareButton';
import validator from "validator";
import { addNewChat } from '../../../components/store/chats/thunks';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from '../../../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { PersonAdd } from '@mui/icons-material';
import MainHome from './components/MainHome';
import userExist from '../../../helpers/userExist';
import { createUserDocument } from '../../../helpers/createUserDocument';
import { loadUserInformation } from '../../../helpers/loadUserInformation';
import sendFriendRequest from '../../../helpers/sendFriendRequest';




const MainView = () => {

    const dispatch = useDispatch();
    const { email, displayName, photoURL, uid, friends } = useSelector(state => state.auth)
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

    const handleAddFriend = async () => {

        Swal.fire({
            title: "Type the friend code!",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Add a friend',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const usuarioExiste = await userExist(result.value)

                if (friends.includes(result.value)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You already have a friendship with this user!',
                    })
                    return;
                }

                if (usuarioExiste && result.value !== uid) {

                    const { picture, name } = await loadUserInformation(result.value);
                    await sendFriendRequest({ id: uid, name: displayName, photo: photoURL }, result.value);


                    Swal.fire({
                        imageUrl: picture.toString(),
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: 'User picture',
                        title: 'Friend request sended',
                        text: `You have sended a friend request to ${name}!`,
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This is not a valid friend code!',
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
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', padding: 3, borderRadius: 3 }}

        >

            <Grid item sx={{ '@media (max-width: 800px)': { flexDirection: 'column' } }} display={'flex'} flex={1} justifyContent={'space-evenly'} borderRadius={3} backgroundColor={''} padding={4} marginRight={2}>


                <Grid item flex={1} display='flex' justifyContent={'center'} sx={{ backgroundColor: 'secondary.main' }} borderRadius={10} xs={12} sm={12} md={7}>
                    <Grid container flexWrap={'wrap'} overflow='hidden' >
                        <MainHome username={displayName} photoURL={photoURL} uid={uid} />
                    </Grid>
                </Grid>

                <Grid item flex={1} display='flex' sx={{ backgroundColor: 'secondary.main' }} borderRadius={10} xs={10} md={4} >
                    <Grid container padding={4} flexWrap={'wrap'} overflow='hidden'>

                        <Grid container spacing={1} direction={'row'} alignItems='center' >
                            <Grid item xs={6}>
                                <SquareButton text={'Add a new friend'} color='aqua' callback={handleAddFriend} Icon={() => <PersonAdd color='warning' />}/>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <SquareButton text={'Add a friend'} color='aqua' callback={() => { handleAddChat() }}  />
                            </Grid> */}

                        </Grid>

                        <Grid container spacing={2} direction={'column'} paddingY={5}>
                            {/* <Grid item>
                                <SquareButton text={'Boton'} color='aqua' callback={() => { }} />
                            </Grid>

                            <Grid item>
                                <SquareButton text={'Boton'} color='aqua' callback={() => { }} />
                            </Grid>
                            <Grid item>
                                <SquareButton text={'Boton'} color='aqua' callback={() => { createUserDocument({ email: email, displayName: displayName, photoURL: photoURL, uid: uid }) }} />
                            </Grid> */}
                        </Grid>
                    </Grid>

                </Grid>



            </Grid>

        </Grid>
    )
}

export default MainView