import Upload from "../src/components/Upload";

export default function analysis() {
    return (
        <div>
            <h1>Look for the painter style</h1>
            <p>내가 그린 그림을 업로드하고,</p>
            <p> 내 그림이 어떤 유명한 화가의 화풍과 얼마나 유사한지 확인해보세요.</p>
            <Upload />
        </div>
    );
}

