import Static_Label from "../../part/label/Static_Label";
import { stores } from "@/lib/core/basic/Constants";
// import Image from "@/lib/component/generic/pure/image";
import { isArabic } from "@/lib/helper/language";
import Spacing from "@/lib/component/generic/pure/spacing";

type Props = { storeCode: string };

export default function StaticLabels({ storeCode = stores[0] }: Props) {
  const cmsStaticLabels = {
    freeReturn: {
      icon: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5714 24C19.7787 24 24 19.7787 24 14.5714C24 9.36414 19.7787 5.14282 14.5714 5.14282C9.36414 5.14282 5.14282 9.36414 5.14282 14.5714C5.14282 19.7787 9.36414 24 14.5714 24Z" fill="#F5A09B"/>
        <path d="M18.2492 27.207L18.2504 27.2051L19.5629 25.0176L19.5629 25.0176L19.5651 25.0138C19.7256 24.7387 20.0829 24.645 20.3739 24.8148C20.6485 24.975 20.7423 25.3313 20.5739 25.622L20.2376 26.1825L19.8112 26.8932L20.618 26.7032C24.2213 25.8546 26.9252 22.6172 26.9252 18.75C26.9252 18.4308 27.1935 18.1625 27.5127 18.1625C27.8318 18.1625 28.1 18.4306 28.1002 18.7496C28.0879 23.8944 23.8941 28.0875 18.7502 28.0875C18.5411 28.0875 18.3439 27.9698 18.2424 27.7903C18.1406 27.6101 18.142 27.3831 18.2492 27.207Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        <path d="M11.751 2.79302L11.7499 2.79493L10.4374 4.98243L10.4374 4.98242L10.4352 4.98615C10.2747 5.26131 9.91737 5.35496 9.62635 5.1852C9.35173 5.025 9.25791 4.66872 9.42637 4.37799L9.76263 3.81754L10.1891 3.10678L9.38228 3.29679C5.77893 4.1454 3.07501 7.38281 3.07501 11.25H3.0749L3.07511 11.2585C3.08269 11.5694 2.82095 11.8375 2.5 11.8375C2.1808 11.8375 1.9125 11.5692 1.9125 11.25C1.9125 6.1058 6.1058 1.9125 11.25 1.9125C11.4591 1.9125 11.6563 2.03017 11.7578 2.20973C11.8597 2.38995 11.8583 2.61685 11.751 2.79302Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        <path d="M21.8013 8.94749L21.8004 8.94697L16.8388 6.07243C16.8387 6.07235 16.8386 6.07228 16.8384 6.0722C16.5565 5.90743 16.4618 5.54729 16.6273 5.26364C16.7937 4.97832 17.1533 4.88993 17.4199 5.04989L17.4199 5.04993L17.4249 5.05282L21.9249 7.65284L22.1003 7.75419L22.2755 7.65257L26.738 5.06506L26.7388 5.0646C27.0195 4.90085 27.3794 5.00358 27.5336 5.27345L27.5336 5.27346L27.5352 5.27616C27.697 5.55363 27.5999 5.9175 27.3221 6.08579L22.3875 8.93417L22.3809 8.93796L22.3746 8.94202C22.2899 8.9959 22.192 9.02478 22.1 9.02478C21.9922 9.02478 21.8919 9.00032 21.8013 8.94749Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        <path d="M22.1001 14.4623C21.5876 14.4623 21.1626 14.0373 21.1626 13.5248V8.4248C21.1626 7.9123 21.5876 7.4873 22.1001 7.4873C22.6126 7.4873 23.0376 7.9123 23.0376 8.4248V13.5248C23.0376 14.0498 22.6126 14.4623 22.1001 14.4623Z" fill="#292D32"/>
        <path d="M22.0997 14.6875C21.5247 14.6875 20.9372 14.5625 20.4747 14.3L17.4747 12.6375C16.4997 12.1 15.7622 10.8375 15.7622 9.72503V6.54998C15.7622 5.42498 16.4997 4.17502 17.4872 3.62502L20.4872 1.9625C21.4122 1.45 22.7997 1.45 23.7372 1.9625L26.7372 3.62502C27.7122 4.16252 28.4497 5.42497 28.4497 6.53747V9.71251C28.4497 10.8375 27.7122 12.0875 26.7372 12.625L23.7372 14.2875C23.2497 14.5625 22.6747 14.6875 22.0997 14.6875ZM21.3872 3.58748L18.3872 5.25001C18.0122 5.46251 17.6372 6.09995 17.6372 6.52495V9.7C17.6372 10.1375 18.0122 10.775 18.3872 10.975L21.3872 12.65C21.7497 12.85 22.4497 12.85 22.8122 12.65L25.8122 10.9875C26.1872 10.775 26.5622 10.1375 26.5622 9.71251V6.53747C26.5622 6.09997 26.1872 5.46252 25.8122 5.26252L22.8122 3.6C22.4497 3.3875 21.7372 3.38748 21.3872 3.58748Z" fill="#292D32"/>
        <path d="M7.90003 23.1248C7.73753 23.1248 7.57502 23.0873 7.42502 22.9998L2.46252 20.1248C2.01252 19.8623 1.86251 19.2873 2.12501 18.8373C2.38751 18.3873 2.96252 18.2373 3.40002 18.4998L7.90003 21.0998L12.3625 18.5123C12.8125 18.2498 13.3875 18.4123 13.6375 18.8498C13.9 19.2998 13.7375 19.8748 13.3 20.1373L8.36252 22.9873C8.22502 23.0748 8.06253 23.1248 7.90003 23.1248Z" fill="#292D32"/>
        <path d="M7.8999 28.2123C7.3874 28.2123 6.9624 27.7873 6.9624 27.2748V22.1748C6.9624 21.6623 7.3874 21.2373 7.8999 21.2373C8.4124 21.2373 8.8374 21.6623 8.8374 22.1748V27.2748C8.8374 27.7998 8.4249 28.2123 7.8999 28.2123Z" fill="#292D32"/>
        <path d="M7.90001 28.4374C7.32501 28.4374 6.73751 28.3124 6.27501 28.0499L3.27499 26.3874C2.29999 25.8499 1.5625 24.5875 1.5625 23.475V20.2999C1.5625 19.1749 2.29999 17.9249 3.27499 17.3874L6.27501 15.725C7.20001 15.2125 8.59999 15.2125 9.52499 15.725L12.525 17.3874C13.5 17.9249 14.2375 19.1874 14.2375 20.2999V23.475C14.2375 24.6 13.5 25.8499 12.5125 26.3999L9.5125 28.0624C9.0625 28.3124 8.48751 28.4374 7.90001 28.4374ZM7.1875 17.3374L4.18751 18.9999C3.81251 19.2124 3.4375 19.8499 3.4375 20.2749V23.4499C3.4375 23.8874 3.81251 24.525 4.18751 24.725L7.1875 26.3874C7.55 26.5874 8.25 26.5874 8.6125 26.3874L11.6125 24.725C11.9875 24.5125 12.3625 23.8749 12.3625 23.4499V20.2749C12.3625 19.8374 11.9875 19.1999 11.6125 18.9999L8.6125 17.3249C8.2625 17.1374 7.55 17.1374 7.1875 17.3374Z" fill="#292D32"/>
        </svg>      
        `,
      text: ["استرجاع مجاني", "Free return"],
    },
    safePay: {
      icon: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7093 22.5615C19.046 22.5615 22.5615 19.046 22.5615 14.7094C22.5615 10.3727 19.046 6.85718 14.7093 6.85718C10.3727 6.85718 6.85718 10.3727 6.85718 14.7094C6.85718 19.046 10.3727 22.5615 14.7093 22.5615Z" fill="#F5A09B"/>
        <path d="M14.9875 1.91567C15.7559 1.91567 16.5088 2.02785 17.0775 2.2404L23.3147 4.57779L23.3154 4.57804C24.99 5.20169 26.3125 7.12027 26.3125 8.90005V18.1875C26.3125 19.0077 26.0536 19.9507 25.6154 20.8226C25.1772 21.6944 24.5746 22.4658 23.9158 22.957L23.9156 22.9571L18.5406 26.9696L18.5406 26.9695L18.5363 26.9729C17.5692 27.7186 16.2976 28.1 15 28.1C13.7035 28.1 12.429 27.7191 11.434 26.9818C11.4338 26.9817 11.4336 26.9815 11.4334 26.9814L6.05937 22.9696L6.05921 22.9695C5.4008 22.4785 4.79808 21.7043 4.35971 20.8306C3.9213 19.9568 3.6625 19.0138 3.6625 18.2001V8.90005C3.6625 7.12027 4.98505 5.20169 6.65965 4.57804L6.66032 4.57779L12.8975 2.2404C12.8976 2.24038 12.8976 2.24036 12.8977 2.24034C13.4664 2.02783 14.2191 1.91567 14.9875 1.91567ZM13.3151 3.34713L13.3147 3.34731L7.07718 5.68481L7.07668 5.68499C6.46196 5.91642 5.90976 6.40918 5.51364 6.9823C5.1174 7.55559 4.85 8.24878 4.85 8.91255V18.2001C4.85 18.8658 5.08137 19.633 5.42304 20.3147C5.76463 20.9962 6.23905 21.6373 6.7656 22.0305L6.76563 22.0305L12.1404 26.0428C12.9317 26.6346 13.9754 26.9188 15.0016 26.9188C16.0278 26.9188 17.074 26.6346 17.8709 26.0437L17.8719 26.043L23.2469 22.0305L23.2475 22.03C23.7795 21.6311 24.2539 20.9905 24.5943 20.3097C24.9347 19.6289 25.1625 18.865 25.1625 18.2001V8.90005C25.1625 8.24181 24.8946 7.5517 24.4989 6.97917C24.103 6.40647 23.5519 5.91164 22.9392 5.67378L22.9392 5.67375L22.9353 5.67231L16.6978 3.33481L16.6978 3.33475L16.6915 3.3325C16.2164 3.16484 15.5985 3.08748 15.0006 3.08911C14.4033 3.09074 13.7864 3.1713 13.3151 3.34713Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        <path d="M13.0776 15.7724L13.325 16.0199L13.5725 15.7724L18.285 11.0599C18.5109 10.8341 18.8892 10.8341 19.1151 11.0599L19.3596 10.8153L19.1151 11.0599C19.3409 11.2857 19.3409 11.6641 19.1151 11.8899L13.7401 17.2649C13.6217 17.3833 13.4747 17.4374 13.325 17.4374C13.1754 17.4374 13.0284 17.3833 12.91 17.2649L10.8975 15.2524C10.6717 15.0266 10.6717 14.6482 10.8975 14.4224C11.1234 14.1966 11.5017 14.1966 11.7276 14.4224L13.0776 15.7724Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        </svg>      
        `,
      text: ["دفع آمن", "Safe payment"],
    },
    freeShipping: {
      icon: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.4286 5.14282H0V22.2857H15.4286V5.14282Z" fill="#F5A09B"/>
        <path d="M18.1622 3.4375V3.0875H17.8122H7.49972C5.89644 3.0875 4.43079 3.95728 3.64472 5.35325L3.64471 5.35324L3.64373 5.355C3.48816 5.63504 3.12674 5.73825 2.84472 5.58157C2.56485 5.42609 2.46158 5.06491 2.61789 4.78294C3.60661 3.01785 5.47772 1.9125 7.49972 1.9125H18.7497C19.0689 1.9125 19.3372 2.1808 19.3372 2.5V15C19.3372 16.7067 17.9564 18.0875 16.2497 18.0875H14.9997C14.6805 18.0875 14.4122 17.8192 14.4122 17.5C14.4122 17.1808 14.6805 16.9125 14.9997 16.9125H16.2497C17.3055 16.9125 18.1622 16.0558 18.1622 15V3.4375Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        <path d="M6.68747 24.4125H6.95116L7.02389 24.159C7.39485 22.8663 8.58656 21.9125 10 21.9125C11.4134 21.9125 12.6052 22.8663 12.9761 24.159L13.0488 24.4125H13.3125H16.7H16.9637L17.0364 24.159C17.4074 22.8663 18.5991 21.9125 20.0125 21.9125C21.4259 21.9125 22.6176 22.8663 22.9885 24.159L23.0613 24.4125H23.325H23.75C25.4933 24.4125 26.9125 22.9933 26.9125 21.25V18.4375V18.0875H26.5625H23.75C22.7433 18.0875 21.9125 17.2567 21.9125 16.25V12.5C21.9125 11.492 22.7321 10.6625 23.75 10.6625H24.3535L24.0538 10.1387L22.7173 7.80304C22.7172 7.80273 22.717 7.80243 22.7168 7.80212C22.3781 7.20242 21.7353 6.8375 21.05 6.8375H19.6875H19.3375V7.1875V15C19.3375 16.7067 17.9567 18.0875 16.25 18.0875H15C14.6808 18.0875 14.4125 17.8192 14.4125 17.5C14.4125 17.1808 14.6808 16.9125 15 16.9125H16.25C17.3058 16.9125 18.1625 16.0558 18.1625 15V6.25C18.1625 5.9308 18.4308 5.6625 18.75 5.6625H21.05C22.1615 5.6625 23.183 6.25731 23.7334 7.22329L23.7337 7.22378L25.8703 10.9597C25.8704 10.96 25.8706 10.9602 25.8707 10.9604C25.9724 11.1409 25.9723 11.3724 25.8703 11.5528C25.7732 11.7245 25.5807 11.8375 25.3625 11.8375H23.75C23.3817 11.8375 23.0875 12.1317 23.0875 12.5V16.25C23.0875 16.6183 23.3817 16.9125 23.75 16.9125H27.5C27.8192 16.9125 28.0875 17.1808 28.0875 17.5V21.25C28.0875 23.6442 26.1442 25.5875 23.75 25.5875H22.5C22.1808 25.5875 21.9125 25.3192 21.9125 25C21.9125 23.9442 21.0558 23.0875 20 23.0875C18.9442 23.0875 18.0875 23.9442 18.0875 25C18.0875 25.3192 17.8192 25.5875 17.5 25.5875H12.5C12.1808 25.5875 11.9125 25.3192 11.9125 25C11.9125 23.9442 11.0558 23.0875 10 23.0875C8.9442 23.0875 8.0875 23.9442 8.0875 25C8.0875 25.3192 7.8192 25.5875 7.5 25.5875H6.25C3.8558 25.5875 1.9125 23.6442 1.9125 21.25C1.9125 20.9308 2.1808 20.6625 2.5 20.6625C2.8192 20.6625 3.0875 20.9308 3.0875 21.25C3.0875 22.9933 4.5067 24.4125 6.25 24.4125H6.68747Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        <path d="M10 28.0875C8.2933 28.0875 6.9125 26.7067 6.9125 25C6.9125 23.2933 8.2933 21.9125 10 21.9125C11.7067 21.9125 13.0875 23.2933 13.0875 25C13.0875 26.7067 11.7067 28.0875 10 28.0875ZM10 23.0875C8.9442 23.0875 8.0875 23.9442 8.0875 25C8.0875 26.0558 8.9442 26.9125 10 26.9125C11.0558 26.9125 11.9125 26.0558 11.9125 25C11.9125 23.9442 11.0558 23.0875 10 23.0875Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        <path d="M20 28.4375C18.1 28.4375 16.5625 26.9 16.5625 25C16.5625 23.1 18.1 21.5625 20 21.5625C21.9 21.5625 23.4375 23.1 23.4375 25C23.4375 26.9 21.9 28.4375 20 28.4375ZM20 23.4375C19.1375 23.4375 18.4375 24.1375 18.4375 25C18.4375 25.8625 19.1375 26.5625 20 26.5625C20.8625 26.5625 21.5625 25.8625 21.5625 25C21.5625 24.1375 20.8625 23.4375 20 23.4375Z" fill="#292D32"/>
        <path d="M27.5 18.4375H23.75C22.55 18.4375 21.5625 17.45 21.5625 16.25V12.5C21.5625 11.3 22.55 10.3125 23.75 10.3125H25.3625C25.7 10.3125 26.0125 10.4875 26.175 10.7875L28.3125 14.5375C28.3875 14.675 28.4375 14.8375 28.4375 15V17.5C28.4375 18.0125 28.0125 18.4375 27.5 18.4375ZM23.75 12.1875C23.575 12.1875 23.4375 12.325 23.4375 12.5V16.25C23.4375 16.425 23.575 16.5625 23.75 16.5625H26.5625V15.25L24.8125 12.1875H23.75Z" fill="#292D32"/>
        <path d="M10 10.9375H2.5C1.9875 10.9375 1.5625 10.5125 1.5625 10C1.5625 9.4875 1.9875 9.0625 2.5 9.0625H10C10.5125 9.0625 10.9375 9.4875 10.9375 10C10.9375 10.5125 10.5125 10.9375 10 10.9375Z" fill="#292D32"/>
        <path d="M7.5 14.6875H2.5C1.9875 14.6875 1.5625 14.2625 1.5625 13.75C1.5625 13.2375 1.9875 12.8125 2.5 12.8125H7.5C8.0125 12.8125 8.4375 13.2375 8.4375 13.75C8.4375 14.2625 8.0125 14.6875 7.5 14.6875Z" fill="#292D32"/>
        <path d="M5 18.4375H2.5C1.9875 18.4375 1.5625 18.0125 1.5625 17.5C1.5625 16.9875 1.9875 16.5625 2.5 16.5625H5C5.5125 16.5625 5.9375 16.9875 5.9375 17.5C5.9375 18.0125 5.5125 18.4375 5 18.4375Z" fill="#292D32"/>
        </svg>      
        `,
      text: [
        "شحن مجاني للطلبات الاكثر من",
        "Free shipping for order value more than",
      ],
    },
    customerService: {
      icon: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.2857 6.85718H6.85718V20.5715H22.2857V6.85718Z" fill="#F5A09B"/>
        <path d="M12.8225 27.1899L12.821 27.1884L10.6835 25.076L10.6821 25.0746C10.0798 24.4863 9.29225 24.1624 8.44999 24.1624H7.5C5.10335 24.1624 3.1625 22.2292 3.1625 19.8625V6.22491C3.1625 3.85815 5.10335 1.92495 7.5 1.92495H22.5C24.8966 1.92495 26.8375 3.85815 26.8375 6.22491V19.8625C26.8375 22.2292 24.8966 24.1624 22.5 24.1624H21.55C20.7105 24.1624 19.9083 24.4845 19.3157 25.0768C19.3155 25.077 19.3152 25.0772 19.315 25.0775L17.179 27.1884L17.1775 27.1899C16.5838 27.7836 15.7867 28.0874 15 28.0874C14.2133 28.0874 13.4162 27.7836 12.8225 27.1899ZM13.654 26.3489L13.6551 26.35C14.4036 27.0833 15.6088 27.0833 16.3574 26.35L16.3585 26.3489L18.4957 24.2366C19.3184 23.4255 20.4054 22.9749 21.5625 22.9749H22.5C24.2392 22.9749 25.6625 21.5723 25.6625 19.8499V6.2124C25.6625 4.47652 24.2382 3.08744 22.5 3.08744H7.5C5.76079 3.08744 4.3375 4.49004 4.3375 6.2124V19.8499C4.3375 21.5858 5.76183 22.9749 7.5 22.9749H8.44999C9.60705 22.9749 10.694 23.4255 11.5167 24.2365C11.5167 24.2365 11.5167 24.2366 11.5168 24.2366L13.654 26.3489Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        <path d="M11.5128 14.825L11.3161 14.5355C11.3026 14.5446 11.2891 14.5538 11.2755 14.563C10.6461 14.9904 9.96054 15.4558 9.60682 16.0925L9.31795 16.6125H9.91278H12.9628C13.282 16.6125 13.5503 16.8808 13.5503 17.2C13.5503 17.5254 13.2884 17.7875 12.9753 17.7875H9.62528C9.18847 17.7875 8.78119 17.5795 8.52152 17.22L8.52153 17.22L8.51976 17.2176C8.27756 16.8882 8.21534 16.4803 8.33432 16.0796C8.73025 14.8745 9.69661 14.2108 10.6595 13.552C11.1526 13.2191 11.5768 12.9232 11.8735 12.6091C12.1847 12.2796 12.3753 11.91 12.3753 11.4375C12.3753 10.5943 11.6936 9.91245 10.8503 9.91245C10.0069 9.91245 9.32529 10.5943 9.32529 11.4375C9.32529 11.7567 9.05699 12.025 8.73779 12.025C8.41859 12.025 8.15029 11.7567 8.15029 11.4375C8.15029 9.95488 9.35702 8.73745 10.8503 8.73745C12.3445 8.73745 13.5503 9.94332 13.5503 11.4375C13.5503 12.991 12.4021 13.7944 11.3155 14.5359L11.5128 14.825ZM11.5128 14.825C10.9947 15.1769 10.4996 15.5135 10.1589 15.9125H9.91278V16.2625L10.2187 16.4325C10.2509 16.3745 10.2873 16.318 10.3276 16.2625H12.9628C13.4753 16.2625 13.9003 16.6875 13.9003 17.2C13.9003 17.7125 13.4878 18.1375 12.9753 18.1375H9.62528C9.07528 18.1375 8.56278 17.8749 8.23778 17.4249C7.92528 16.9999 7.85028 16.475 8.00028 15.975L11.5128 14.825Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        <path d="M19.4623 16.3376V15.9876H19.1123H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6623H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6622H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.6621H16.662H16.662H16.662H16.662H16.662H16.662H16.662H16.662H16.662H16.662H16.662H16.662H16.662H16.662H16.662H16.6619H16.6619H16.6619H16.6619H16.6619H16.6619H16.6619H16.6619H16.6619H16.6619H16.6619H16.6619H16.6619H16.6618H16.6618H16.6618H16.6618H16.6618H16.6618H16.6618H16.6618H16.6618H16.6618H16.6618H16.6617H16.6617H16.6617H16.6617H16.6617H16.6617H16.6617H16.6617H16.6617H16.6617H16.6616H16.6616H16.6616H16.6616H16.6616H16.6616H16.6616H16.6616H16.6615H16.6615H16.6615H16.6615H16.6615H16.6615H16.6615H16.6615H16.6615H16.6614H16.6614H16.6614H16.6614H16.6614H16.6614H16.6614H16.6613H16.6613H16.6613H16.6613H16.6613H16.6613H16.6613H16.6612H16.6612H16.6612H16.6612H16.6612H16.6612H16.6612H16.6611H16.6611H16.6611H16.6611H16.6611H16.6611H16.661H16.661H16.661H16.661H16.661H16.661H16.6609H16.6609H16.6609H16.6609H16.6609H16.6609H16.6608H16.6608H16.6608H16.6608H16.6608H16.6608H16.6607H16.6607H16.6607H16.6607H16.6607H16.6606H16.6606H16.6606H16.6606H16.6606H16.6605H16.6605H16.6605H16.6605H16.6605H16.6604H16.6604H16.6604H16.6604H16.6604H16.6603H16.6603H16.6603H16.6603H16.6602H16.6602H16.6602H16.6602H16.6602H16.6601H16.6601H16.6601H16.6601H16.66H16.66H16.66H16.66H16.6599H16.6599H16.6599H16.6599H16.6598H16.6598H16.6598H16.6598H16.6597H16.6597H16.6597H16.6597H16.6596H16.6596H16.6596H16.6596H16.6595H16.6595H16.6595H16.6594H16.6594H16.6594H16.6594H16.6593H16.6593H16.6593H16.6592H16.6592H16.6592H16.6592H16.6591H16.6591H16.6591H16.659H16.659H16.659H16.6589H16.6589H16.6589H16.6589H16.6588H16.6588H16.6588H16.6587H16.6587H16.6587H16.6586H16.6586H16.6586H16.6585H16.6585H16.6585H16.6584H16.6584H16.6584H16.6583H16.6583H16.6583H16.6582H16.6582H16.6582H16.6581H16.6581H16.658H16.658H16.658H16.6579H16.6579H16.6579H16.6578H16.6578H16.6578H16.6577H16.6577H16.6576H16.6576H16.6576H16.6575H16.6575H16.6574H16.6574H16.6574H16.6573H16.6573H16.6572H16.6572H16.6572H16.6571H16.6571H16.657H16.657H16.657H16.6569H16.6569H16.6568H16.6568H16.6567H16.6567H16.6567H16.6566H16.6566H16.6565H16.6565H16.6564H16.6564H16.6564H16.6563H16.6563H16.6562H16.6562H16.6561H16.6561H16.656H16.656H16.6559H16.6559H16.6558H16.6558H16.6557H16.6557H16.6557H16.6556H16.6556H16.6555H16.6555H16.6554H16.6554H16.6553H16.6553H16.6552H16.6552H16.6551H16.6551H16.655H16.655H16.6549H16.6548H16.6548H16.6547H16.6547H16.6546H16.6546H16.6545H16.6545H16.6544H16.6544H16.6543H16.6543H16.6542H16.6541H16.6541H16.654H16.654H16.6539H16.6539H16.6538H16.6538H16.6537H16.6536H16.6536H16.6535H16.6535H16.6534H16.6534H16.6533H16.6532H16.6532H16.6531H16.6531H16.653H16.6529H16.6529H16.6528H16.6527H16.6527H16.6526H16.6526H16.6525H16.6524H16.6524H16.6523H16.6522H16.6522H16.6521H16.6521H16.652H16.6519H16.6519H16.6518H16.6517H16.6517H16.6516H16.6515H16.6515H16.6514H16.6513H16.6513H16.6512H16.6511H16.6511H16.651H16.6509H16.6509H16.6508H16.6507H16.6506H16.6506H16.6505H16.6504H16.6504H16.6503H16.6502H16.6501H16.6501H16.65H16.6499H16.6499C16.1632 15.9876 15.7145 15.7299 15.464 15.3102C15.2149 14.8804 15.2173 14.3546 15.4631 13.9417L15.465 13.9385C16.3138 12.4781 17.2993 10.819 18.1968 9.37297C18.5133 8.86914 19.1144 8.64211 19.6775 8.7989C20.2451 8.96944 20.6346 9.48434 20.6249 10.0694L20.6248 10.0694V10.0752V14.4751V14.8251H20.9748H21.2498C21.569 14.8251 21.8373 15.0934 21.8373 15.4126C21.8373 15.7318 21.569 16.0001 21.2498 16.0001H20.9873H20.6373V16.3501V17.2127C20.6373 17.5288 20.3846 17.7877 20.0498 17.7877C19.7306 17.7877 19.4623 17.5194 19.4623 17.2002V16.3376ZM19.4623 10.8002V9.56224L18.8142 10.6169C18.0747 11.82 17.3108 13.1099 16.6227 14.2858L16.3145 14.8126H16.9248H19.1123H19.4623V14.4626V10.8002Z" fill="#292D32" stroke="#333333" stroke-width="0.7"/>
        </svg>
        
        `,
      text: ["خدمة عملاء 24/7", "Customer service 24/7"],
    },
  };
  const labels = Object.entries(cmsStaticLabels);

  return (
    <div className=" bg-product_card_background py-5 lg:flex lg:items-center lg:justify-center">
      {labels.map((staticLabel, index) => {
        return (
          <section key={index}>
            <Static_Label className=" flex items-center gap-4 px-5">
              {/* TODO:fix this with image */}
              <div
                dangerouslySetInnerHTML={{ __html: staticLabel[1].icon }}
              ></div>
              <p className=" text-sm lg:text-base">
                {`${
                  isArabic(storeCode)
                    ? staticLabel[1].text[0]
                    : staticLabel[1].text[1]
                } ${staticLabel[0] === "freeShipping" ? "1200 ر.س " : ""}`}
              </p>
            </Static_Label>
            {index != labels.length - 1 && <Spacing value={4} />}
          </section>
        );
      })}
    </div>
  );
}
