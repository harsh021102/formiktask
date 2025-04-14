import defaultImg from "../img/defaultImg.jpg";
let imgFile=null;

const urlToFile = async (url, filename, mimeType) => {
	const res = await fetch(url);
	const blob = await res.blob();
	return new File([blob], filename, { type: mimeType || blob.type });
};
const loadDefault = async () => {
    const file = await urlToFile(defaultImg, "defaultImg.jpg", "image/jpg")
    imgFile = file;
    const dummyUsers = [
        {
            id: 1,
            fname: "Harsh",
            lname: "Singh",
            email: "harsh@gmail.com",
            password: "H@rsh1601",
            gender: "male",
            dob: "16-01-2001",
            phone: "917393917886",
            image: imgFile,
        },
        {
            id: 2,
            fname: "Ahinandan",
            lname: "Singh",
            email: "harsh@gmail.com",
            password: "H@rsh1601",
            gender: "male",
            dob: "16-01-1997",
            phone: "917393917886",
            image: imgFile,
        },
        {
            id: 3,
            fname: "Anushka",
            lname: "Sexena",
            email: "harsh@gmail.com",
            password: "H@rsh1601",
            gender: "female",
            dob: "11-12-2003",
            phone: "917393917886",
            image: imgFile,
        },
        {
            id: 4,
            fname: "AAkanksha",
            lname: "Verma",
            email: "harsh@gmail.com",
            password: "H@rsh1601",
            gender: "female",
            dob: "16-11-2000",
            phone: "917393917886",
            image: imgFile,
        },
    ]
    return dummyUsers;
};

export default loadDefault;