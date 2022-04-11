import React from 'react';
import { Layout, Row, Col, Modal, Input } from 'antd';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// import About from '../info/About.jsx';
// import Privacy from '../info/Privacy.jsx';
// import Terms from '../info/Terms.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Center from './Center.jsx';

import styles from './Main.scss';
import { PlusOutlined } from "@ant-design/icons"

class Main extends React.Component {
    state = {
        isModalVisible: false,
        files: [],
        networkId: process.env.REACT_APP_NETWORK_ID,
        rpcUrl: process.env.REACT_APP_RPC_URL,
        networkName: process.env.REACT_APP_NETWORK_ID,
    }

    constructor (props) {
        super(props);
    }

    readFile (file) {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.readAsText(file, 'UTF-8')
            reader.onload = function (e) {
                resolve(e.target.result)
            }
        })
    }

    async onImport (e) {
        const customNodes = {
            nodes: [
                {
                    name: this.state.networkName,
                    key: `custom_${this.state.networkName}`,
                    endpoint: this.state.rpcUrl,
                    id: this.state.networkId
                },
            ],
            type: "My networks",
        }

        localStorage.setItem('customNodes', JSON.stringify(customNodes))
        localStorage.setItem('activeNode', `"custom_${this.state.networkName}"`)

        let contracts = []
        for (let i = 0; i < this.state.files.length; ++i) {
            const file = this.state.files[i]
            const json = await this.readFile(file)
            const data = JSON.parse(json)

            const networks = data.networks
            if (networks[this.state.networkId]) {
                contracts.push({
                    address: data.networks[this.state.networkId].address,
                    name: file.name.split('.')[0],
                    networkId: this.state.networkId,
                    abi: data.abi
                })
            }
        }
        console.log(this.state.files)

        localStorage.setItem('contracts', JSON.stringify(contracts))

        setTimeout(() => window.location.reload(), 1000)
    }

    onCancel () {
        this.setState({
            files: [],
            isModalVisible: false
        })
    }

    handleFileChange (e) {
        this.setState({
            files: e?.target?.files ?? []
        })
    }

    handleChainIdChange (e) {
        this.setState({
            networkId: e?.target?.value
        })
    }

    render () {
        return (
            <Router style={{
                height: "100%",
            }}>
                <Layout theme='light' style={{
                    height: "100%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Layout.Header className={styles.header}>
                        <Header />
                    </Layout.Header>
                    <Layout.Content className={styles.content}>
                        <Switch>
                            <Route exact path='/' component={Center}></Route>
                            {/* <Route path='/about' component={About}></Route>
                            <Route path='/privacy' component={Privacy}></Route>
                            <Route path='/terms' component={Terms}></Route> */}
                        </Switch>
                    </Layout.Content>
                    <Layout.Footer className={styles.footer}>
                        {/* <Footer /> */}

                        <div>
                            Github: <u>olekon/justsmartcontracts</u>
                        </div>
                    </Layout.Footer>

                    <div
                        onClick={() => this.setState({ isModalVisible: true })}
                        style={{
                            position: "fixed",
                            top: "calc(100vh - 110px)",
                            right: "60px",
                            lineHeight: "60px",
                            width: "60px",
                            height: "60px",
                            textAlign: "center",
                            background: "#1890ff",
                            color: "white",
                            fontSize: "24px",
                            borderRadius: "30px",
                            cursor: "pointer",
                            boxShadow: "#8080807d 4px 12px 20px 3px"
                        }}><PlusOutlined /></div>

                    <Modal
                        title="导入ABI"
                        visible={this.state.isModalVisible}
                        onOk={this.onImport.bind(this)}
                        onCancel={this.onCancel.bind(this)}
                        okText="导入"
                        cancelText="取消"
                    >
                        <Row span={24}>
                            <Col span={6}>选择ABI文件</Col>
                            <Col span={18}>
                                <Input type="file" accept='.json' multiple onChange={this.handleFileChange.bind(this)}></Input>
                            </Col>
                        </Row>
                        <div style={{ height: "30px" }} />
                        <Row span={24}>
                            <Col span={6}>链备注名</Col>
                            <Col span={18}>
                                <Input style={{ width: "100%" }}
                                    value={this.state.networkName}
                                    onChange={e => this.setState({ networkName: e?.target?.value })}
                                ></Input>
                            </Col>
                        </Row>
                        <div style={{ height: "30px" }} />
                        <Row span={24}>
                            <Col span={6}>链 ID</Col>
                            <Col span={18}>
                                <Input
                                    style={{ width: "100%" }}
                                    type="number"
                                    value={this.state.networkId}
                                    onChange={this.handleChainIdChange.bind(this)}
                                ></Input>
                            </Col>
                        </Row>
                        <div style={{ height: "30px" }} />
                        <Row span={24}>
                            <Col span={6}>RPC URL</Col>
                            <Col span={18}>
                                <Input style={{ width: "100%" }}
                                    value={this.state.rpcUrl}
                                    onChange={e => this.setState({rpcUrl: e?.target?.value })}
                                ></Input>
                            </Col>
                        </Row>
                    </Modal>
                </Layout>
            </Router>
        );
    }
}


export default Main;
