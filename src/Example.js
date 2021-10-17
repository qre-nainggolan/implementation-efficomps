import 'bootstrap/dist/css/bootstrap.min.css'; 
import React, { Component } from 'react';
import { Container, Button, ModalBody, ModalFooter, Row } from 'reactstrap';
import './Button.css';

import { GenerateInputText, GenerateButton, GenerateNotificationPopup, GenerateInputGroup, TableWrapper, FormModalWrapper } from 'efficomps';
import { HTTPProxy } from 'efficomps';
import { DataModelling } from 'efficomps';
import './CollaboratorComponent.css';

export default class Example extends Component {

    componentDidMount() {
        HTTPProxy({
            urlTarget: 'http://localhost:58778/api/SampleData/GetListBongkarMuat',
            params: "?username=erik",
            method: 'GET',
            onSuccess: this.updateListBongkarMuat
        });
    }

    componentDidUpdate() {
    }

    toggle() {
        let modalState = !this.state.modal;
        this.setState(state => ({ modal: modalState }));
    }

    toggleTimbang() {
        let modalState = !this.state.modalTimbang;
        this.setState(state => ({ modalTimbang: modalState }));
    }

    toggleExitTransaction() {
        let modalState = !this.state.modalExitTransaction;
        this.setState(state => ({ modalExitTransaction: modalState }));
    }

    togglePrintTransaction() {
        let modalState = !this.state.modalPrintTransaction;
        this.setState(state => ({ modalPrintTransaction: modalState }));
    }

    updateListCommodity(newData) {
        this.setState(state => ({ listCommodity: newData }))
    }

    updateListBongkarMuat(newData) {
        this.setState(state => ({ listBongkarMuat: newData }))
    }

    toggleCommodity() {

        HTTPProxy({
            urlTarget: 'http://localhost:58778/api/SampleData/GetListCommodity',
            params: "?username=erik",
            method: 'GET',
            onSuccess: this.updateListCommodity
        });

        let modalState = !this.state.modalCommodity;
        this.setState(state => ({ modalCommodity: modalState }));
    }

    togglePengangkutan() {

        HTTPProxy({
            urlTarget: 'http://localhost:58778/api/SampleData/GetListCommodity',
            params: "?username=erik",
            method: 'GET',
            onSuccess: this.updateListCommodity
        });

        let modalState = !this.state.modalCommodity;
        this.setState(state => ({ modalCommodity: modalState }));
    }

    loadSelectedData(e, textValue) {

        let commodityValue = textValue.komoditi;
        let groupValue = textValue.komoditi_Group;
        let pengangkutanValue = textValue.type_Pengangkutan;

        this.setState(state => ({
            commoditiy: commodityValue,
            group: groupValue,
            pengangkutan: pengangkutanValue,
            modalCommodity: false
        }))
    }

    textChanged(e) {
        const targetValue = e.target.value;
        this.setState(state => ({
            value: targetValue
        }));
    }

    nomorKendaraanChanged(e) {
        const targetValue = e.target.value;
        this.setState(state => ({
            nomorKendaraan: targetValue
        }));
    }

    SPChanged(e) {
        const targetValue = e.target.value;
        this.setState(state => ({
            SP: targetValue
        }));
    }

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalExitTransaction: false,
            modalCommodity: false,
            modalTimbang: false,
            value: '',
            commoditiy: '',
            pengangkutan: '',
            group: '',
            nomorKendaraan: '',
            SP: '',
            listCommodity: [{ fetchingData: true }],
            listBongkarMuat: [{ fetchingData: true }]
        };
        this.toggle = this.toggle.bind(this);
        this.toggleExitTransaction = this.toggleExitTransaction.bind(this);
        this.togglePrintTransaction = this.togglePrintTransaction.bind(this);
        this.toggleCommodity = this.toggleCommodity.bind(this);
        this.togglePengangkutan = this.togglePengangkutan.bind(this);
        this.toggleTimbang = this.toggleTimbang.bind(this);
        this.updateListCommodity = this.updateListCommodity.bind(this);
        this.updateListBongkarMuat = this.updateListBongkarMuat.bind(this);
        this.loadSelectedData = this.loadSelectedData.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.nomorKendaraanChanged = this.nomorKendaraanChanged.bind(this);
        this.SPChanged = this.SPChanged.bind(this);

        this.BongkarMuatDataModel = DataModelling({
            fields: [
                { name: 'no_Kendaraan', header: 'No.Kendaraan', type: 'string', showHeader: true },
                { name: 'no_Masuk', header: 'No.Masuk', type: 'string', showHeader: true },
                { name: 'berat_Masuk', header: 'Berat Masuk', type: 'string', showHeader: true },
                { name: 'komoditi', header: 'Komoditi', type: 'string', showHeader: true },
                { name: 'no_Tiket', header: 'No.Tiket', type: 'string', showHeader: true },
                { name: 'no_Keluar', header: 'No.Keluar', type: 'string', showHeader: true },
                { name: 'tanggal_Keluar', header: 'Tanggal Keluar', type: 'string', showHeader: true },
                { name: 'berat_Keluar', header: 'Berat Keluar', type: 'string', showHeader: true },
                { name: 'berat_Netto', header: 'Berat Bersih', type: 'string', showHeader: true },
                { name: 'potongan', header: 'Potongan', type: 'string', showHeader: false },
                { name: 'sumber_Komoditi', header: 'Sumber_Komoditi', type: 'string', showHeader: false },
                { name: 'spesifikasi_Komoditi', header: 'Spesifikasi_Komoditi', type: 'string', showHeader: false },
                { name: 'komoditi_Group', header: 'Komoditi_Group', type: 'string', showHeader: false },
                { name: 'storage_Location', header: 'Storage_Location', type: 'string', showHeader: false },
                { name: 'pengangkutan', header: 'Pengangkutan', type: 'string', showHeader: false },
                { name: 'no_SP', header: 'No_SP', type: 'string', showHeader: false },
                { name: 'nama_Supir', header: 'Nama_Supir', type: 'string', showHeader: false },
                { name: 'no_SIM', header: 'No_SIM', type: 'string', showHeader: false },
                { name: 'data_STNK_Kendaraan', header: 'Data_STNK_Kendaraan', type: 'string', showHeader: false },
                { name: 'dataTarra_Kendaraan', header: 'DataTarra_Kendaraan', type: 'string', showHeader: false },
                { name: 'jumlah_Segel', header: 'Jumlah_Segel', type: 'string', showHeader: false },
                { name: 'keterangan_Muatan', header: 'Keterangan_Muatan', type: 'string', showHeader: false },
                { name: 'userID', header: 'UserID', type: 'string', showHeader: false },
                { name: 'user_Profile', header: 'User_Profile', type: 'string', showHeader: false },
                { name: 'last_Change', header: 'Last_Change', type: 'string', showHeader: false },
                { name: 'tahun_Tanam', header: 'Tahun_Tanam', type: 'string', showHeader: false },
                { name: 'comp_Name', header: 'Comp_Name', type: 'string', showHeader: false },
                { name: 'fCQueueNo', header: 'FCQueueNo', type: 'string', showHeader: false }
            ]
        });

        this.CommodityDataModel = DataModelling({
            fields:[
                {name:'komoditi', header:'Komoditi', type:'string', showHeader:true },
                {name:'komoditi_Group', header:'Komoditi_Group', type:'string', showHeader:true },
                {name:'kode_Tiket', header:'Kode_Tiket', type:'string', showHeader:true },
                {name:'sumber', header:'Sumber', type:'string', showHeader:true },
                {name:'type_Spesifikasi', header:'Type_Spesifikasi', type:'string', showHeader:true },
                {name:'type_Pengangkutan', header:'Type_Pengangkutan', type:'string', showHeader:true },
                {name:'sales_ProductCode', header:'Sales_ProductCode', type:'string', showHeader:true },
                {name:'type_Storage', header:'Type_Storage', type:'string', showHeader:true },
                {name:'sorageLocation', header:'SorageLocation', type:'string', showHeader:true },
                {name:'segel', header:'Segel', type:'string', showHeader:true },
                {name:'keterangan_Komoditi', header:'Keterangan_Komoditi', type:'string', showHeader:true },
                {name: 'userID', header: 'UserID', type: 'string', showHeader: false },
                {name:'user_Profile', header:'User_Profile', type:'string', showHeader:false },
                {name: 'lastChange', header: 'LastChange', type: 'string', showHeader: false }
            ]
        })
    }

    render() {
        return (
            <div className='ModuleContainer'>                                
                <Container>
                    <FormModalWrapper
                        className={''}
                        headerTitle={'Form Transaksi Masuk'}
                        onToggleMethod={this.toggle}
                        name={'EntryForm'}
                        isOpen={this.state.modal}
                    >
                        <ModalBody>
                            <Row>
                                <GenerateInputGroup
                                    className={'btn btn-primary'}
                                    name={'Komoditi'}
                                    placeholder={'Komoditi'}
                                    directStyle={{ marginLeft: '25px', marginRight: '5px' }}
                                    label={"Komoditi"}
                                    value={this.state.commoditiy}
                                />
                                <GenerateButton
                                    className={'btn btn-primary'}
                                    name={'LookupButton'}
                                    clickMethod={this.toggleCommodity}
                                    label={"..."}
                                    directStyle={{ marginLeft: '5px', marginRight: '5px', height:'35px', bottom:'0', marginTop:'34px' }}
                                />
                                <GenerateInputGroup
                                    className={'btn btn-primary'}
                                    name={'Komoditi'}
                                    placeholder={'Group'}
                                    directStyle={{ marginLeft: '5px', marginRight: '5px'}}
                                    label={"Group"}
                                    value={this.state.group}
                                />
                                <GenerateInputGroup
                                    className={'btn btn-primary'}
                                    name={'Pengangkutan'}
                                    placeholder={'Pengangkutan'}
                                    directStyle={{ marginLeft: '5px', marginRight: '5px'}}
                                    label={"Pengangkutan"}
                                    inputDirectStyle={{width:'300px'}}
                                    value={this.state.pengangkutan}
                                />
                                <GenerateButton
                                    className={'btn btn-primary'}
                                    name={'PengangkutanButton'}
                                    clickMethod={this.togglePengangkutan}
                                    label={"..."}
                                    directStyle={{ marginLeft: '5px', marginRight: '5px', height: '35px', bottom: '0', marginTop: '34px' }}
                                />
                                <GenerateInputGroup
                                    className={'btn btn-primary'}
                                    name={'NomorKendaraan'}
                                    placeholder={'No.SP'}
                                    directStyle={{ marginLeft: '5px', marginRight: '5px' }}
                                    label={"No.SP"}
                                    value={this.state.SP}
                                    changeMethod={this.SPChanged}
                                />
                                <GenerateButton
                                    className={'btn btn-primary'}
                                    name={'TimbangButton'}
                                    clickMethod={this.toggleTimbang}
                                    label={"Timbang Berat"}
                                    directStyle={{ marginLeft: '5px', marginRight: '5px', height: '35px', bottom: '0', marginTop: '34px' }}
                                />
                            </Row>
                            <Row style={{marginTop:'10px'}}>
                                <GenerateInputGroup
                                    className={'btn btn-primary'}
                                    name={'NomorKendaraan'}
                                    placeholder={'No.Kendaraan'}
                                    directStyle={{ marginLeft: '25px', marginRight: '5px' }}
                                    label={"No.Kendaraan"}
                                    value={this.state.nomorKendaraan}
                                    inputDirectStyle={{ width: '140px' }}
                                    changeMethod={this.nomorKendaraanChanged}
                                />
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.togglePrintTransaction}>Simpan</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </FormModalWrapper>
                    <FormModalWrapper 
                        className={''}
                        headerTitle={'Daftar Komoditi Timbang Muat'}
                        onToggleMethod={this.modalCommodity}
                        name={'ModalCommodity'}
                        isOpen={this.state.modalCommodity}
                    >
                        <ModalBody>
                            <TableWrapper
                                fields={this.CommodityDataModel}
                                data={this.state.listCommodity}
                                name={'CommodityTable'}
                                doubleClickEvent={this.loadSelectedData}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.togglePrintTransaction}>Cetak</Button>
                            <Button color="secondary" onClick={this.toggleCommodity}>Cancel</Button>
                        </ModalFooter>
                    </FormModalWrapper>
                    <Row>
                        <GenerateNotificationPopup
                            className={''}
                            headerTitle={'Form Transaksi Keluar'}
                            bodyHeaderText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
                            onToggleMethod={this.toggleExitTransaction}
                            name={'ExitForm'}
                            isOpen={this.state.modalExitTransaction}
                        />
                        <GenerateNotificationPopup
                            className={''}
                            headerTitle={'Form Cetak'}
                            bodyHeaderText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
                            onToggleMethod={this.togglePrintTransaction}
                            name={'CetakForm'}
                            isOpen={this.state.modalPrintTransaction}
                        />
                        <GenerateNotificationPopup
                            className={''}
                            headerTitle={'Timbang Berat'}
                            bodyHeaderText={'10,000'}
                            onToggleMethod={this.toggleTimbang}
                            name={'TimbangBerat'}
                            isOpen={this.state.modalTimbang}
                        />
                        <GenerateButton
                            className={'btn btn-primary'}
                            name={'ButtonComponent'}
                            clickMethod={this.toggle}
                            directStyle={{ marginLeft: '13px', marginRight: '2px' }} 
                            label={"Masuk"}
                        />
                        <GenerateButton
                            className={'btn btn-primary'}
                            name={'ButtonComponent'}
                            clickMethod={this.toggleExitTransaction}
                            directStyle={{ marginLeft: '2px', marginRight: '2px' }} 
                            label={"Keluar"}
                        />
                        <GenerateButton
                            className={'btn btn-primary'}
                            name={'ButtonComponent'}
                            clickMethod={this.togglePrintTransaction}
                            directStyle={{ marginLeft: '2px', marginRight: '2px' }} 
                            label={"Cetak Tiket"}
                        />
                        <GenerateInputText
                            className={'btn btn-primary'}
                            name={'InputTextComponent'}
                            changeMethod={this.textChanged}
                            label={"Tikets"}
                            directStyle={{ marginLeft: '5px', width: '350px', borderRadius: '3px', borderWidth: '1px' }}
                            placeholder={"@Kata Kunci Pencarian"}
                            label={"OK"}
                            value={this.state.value}
                        />
                    </Row>
                    <div className="HeaderToggleBoxMenu"></div>
                    <TableWrapper
                        fields={this.BongkarMuatDataModel}
                        data={this.state.listBongkarMuat}
                        name={'TableBongkarMuat'}
                    />
                </Container>                    
            </div>
        );
    }
}