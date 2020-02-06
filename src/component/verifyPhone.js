import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native';
import InputAN from './InputAN';
import StylesApp from './StylesApp';
import ButtonTextAN from './ButtonTextAN';

export default class ConfirmPhone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            isError : false,
            error: null,
            isSendCodeAgain:false,
            time:30,
            timeRun: null,
        }
        this.changeCode = this.changeCode.bind(this);
        this.confirmCode = this.confirmCode.bind(this);
    }

    //-----------------------------------Save code on state--------------------------------------
    changeCode= (value)=> {
       this.setState({
           code:value
       })
    }
    //----------------------------------method check code from input in state--------------------------------------
    checkCode= (input)=> {
        if(!input) {
            this.setState({
                isError : true,
                error: 'Enter code',
            })
            return false;
        }
        if(input != this.getCodefromData())
        {
            this.setState({
                isError : true,
                error: 'Code is not validation',
            })
            return false;
        }
        this.setState({
            isError : false,
            error: null,
        })
        return true;
    }

    //-----------------------------------------faker get code to check-----------------------------------------------
    getCodefromData= ()=> {
        return 123456;
    }

    //------------------------------------------------submit to checkcode--------------------------------------------
    confirmCode= ()=> {
        if(this.checkCode(this.state.code)) {

        }
    }

    sendCodeAgain= ()=>{
        //Send code to phone which is signed
        this.state.timeRun = setInterval(()=>{
            this.setState({
                isSendCodeAgain: true,
                time:this.state.time-1
            })
        },1000);
    }
    componentWillUpdate() {
        if(this.state.time == 0)
        {
            clearInterval(this.state.timeRun);
            this.setState({
                isSendCodeAgain: false,
                time:30,
            })
        }
    }

    render() {
        const errorComponent =(
            <View style={{justifyContent:'center'}}>
                <Text style={{textAlign:'center',color:'red', justifyContent:'center'}}>{this.state.error}</Text>
            </View>
        );

        return (
            <View style={styles.ConfirmPhoneView}>
                <View style={{marginBottom:10}}>
                    <Text style={{textAlign:'center',color: StylesApp.text, fontSize: StylesApp.fontSize}}>Code has been sent to phone number</Text>
                    <Text style={{textAlign:'center',color: StylesApp.text, fontSize: StylesApp.fontSize}}>(+84) 0123456789 {this.state.isSendCodeAgain? ' ('+this.state.time+') ' :null}</Text>
                </View>
                <View>
                    <View  style={{width:350, height:50, borderRadius:10, overflow:'hidden', backgroundColor:'white', flexDirection:'row', alignItems:'center'}}>
                        <InputAN placeholder={'Code'} fontSize={StylesApp.fontSize} bgColor={'white'} onChangeInput= {this.changeCode} width={300}/>
                        <ButtonTextAN title={'again'} onPress={this.sendCodeAgain}/>
                    </View>
                    {/* Show error */}
                    {this.state.isError?errorComponent:null}
                    {/* Show error */}
                    <View style={styles.buttonForm}>
                        <ButtonTextAN title={'Sign in'} onPress={this.confirmCode} fontSize={StylesApp.fontSize} color={'white'} bgColor={StylesApp.button} width={350} height={50}/>
                    </View>
                    <View style = {styles.SignupAndFgPass}>
                        <ButtonTextAN onPress={this.redirectScreen} title={'Signup'} fontSize={StylesApp.fontSize} color={StylesApp.button}/>
                        <ButtonTextAN onPress={this.redirectScreen} title={'Forgot password'} fontSize={StylesApp.fontSize} color={StylesApp.button}/>
                    </View>
                </View>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    ConfirmPhoneView: {
        justifyContent:"flex-start",
        alignItems:'center',
        flexDirection:'column',
        marginTop:10,
        borderColor:'rgba(1,1,1,0.1)',
    },
    buttonForm: { 
        marginTop:10,
        borderRadius:20,
        overflow:'hidden'
    },
    SignupAndFgPass: {
        marginTop:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    textButtonStyle: {
        textAlign:'center',
        color: StylesApp.button, 
        fontSize: StylesApp.fontSize
    }
})