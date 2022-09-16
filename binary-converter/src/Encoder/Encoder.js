import { useState } from 'react';
import { Form, Button, Input, PageHeader, Tag } from 'antd';
import Decoder from "decode-encode-binary";
import { copy } from '../utils/copyToClipboard';

import './Encoder.css';

console.dir(Decoder.decode("0100100001100101011011000110110001101111"));
console.dir(Decoder.encode("Hello"));

function Encoder() {
    const [inputText, setInputText] = useState("");
    const [resultText, setResultText] = useState("");

    const onInputTextChange = (event) => {
        const { value } = event.target;
        setInputText(value);
        try {
            if (value) {
                setResultText(Decoder.auto(value));
            } else {
                onClearText();
            }
        } catch (e) {
            console.error(e);
        }
    }

    const onClearText = () => {
        setInputText("");
        setResultText("");
    }

    const onCopyText = () => {
        copy(resultText);
    }

    return (
        <div className="encoder-page">
            <PageHeader
                className="encoder-page-header"
                backIcon={false}
                title="Fine-Apple"
                tags={<Tag color="blue">Beta</Tag>}
                avatar={{ src: 'https://cdn-icons-png.flaticon.com/512/898/898142.png' }}
            >
                Automatischer Binärkonverter
            </PageHeader>
            <div className="encoder-form">
                <Form
                    layout="horizontal"
                >
                    <div>
                        <Form.Item label="Eingabetext">
                            <Input.TextArea rows={6} onChange={onInputTextChange} value={inputText}/>
                        </Form.Item>
                        <div className="encoder-buttons">
                            <Button onClick={onClearText}>Löschen</Button>
                            <Button onClick={onCopyText} type="primary">Kopieren</Button>
                        </div>
                        <Form.Item label="Ausgabetext">
                            <Input.TextArea rows={6} disabled={true} value={resultText}/>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Encoder;