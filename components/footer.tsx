/**
 * A footer component, featuring:
 * - A logo, name, and job position
 * - Links to social media profiles
 * - A call-to-action button
 * - A separator
 * - A list of links to other pages
 * 
 * @returns A JSX element representing the footer
 */

"use client"

import { Button } from "@/components/ui/button";
import { Links } from "@/components/links";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useTranslations } from "next-intl";


export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="w-full p-12 bg-muted">
            <div className="flex items-center justify-between gap-4 cs-container">
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full overflow-hidden">
                            <Image
                                src="/assets/img/me.jpg"
                                width={80}
                                height={80}
                                alt="logo"
                                className="object-cover aspect-square"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto"
                                }}></Image>
                        </div>
                        <div>
                            <div className="font-bold text-2xl">{t("name")}</div>
                            <div className="text-muted-foreground text-xl">{t("job")}</div>
                        </div>
                    </div>
                    <div className="w-full">
                        <ul className="list-none flex items-center gap-4">
                            <li className="footer-socials">
                                <Link href="https://www.linkedin.com/in/ond%C5%99ej-top%C3%ADnka-195bb4275/" className=" will-change-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" className="fill-foreground size-8 will-change-transform">
                                        <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                                    </svg>
                                </Link>
                            </li>
                            {/* <li>
                                <Link href={"https://github.com/Topeeez"}>
                                    <svg viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000" className="fill-foreground size-8">
                                        <g id="SVGRepo_iconCarrier">
                                            <g>
                                                <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill-rule="nonzero"> </path>
                                            </g>
                                        </g>
                                    </svg>
                                </Link>
                            </li> */}
                            <li className="footer-socials">
                                <Link href={"https://github.com/Topeeez"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" className="fill-foreground size-8">
                                        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center w-1/2 gap-10">
                    <div>
                        <Button className="text-4xl p-6 rounded-2xl font-bold bg-transparent text-foreground hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-sky-400 hover:text-transparent transition-all ease-in-out">{t("ctabutton")}</Button>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <div className="text-2xl font-bold">Email:</div>
                            <div className="text-lg text-muted-foreground">topetopinka7@seznam.cz</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">Discord:</div>
                            <div className="text-lg text-muted-foreground">t0p33z</div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="cs-container">
                <Separator className="my-6 bg-gradient-to-r from-blue-600 to-sky-400" />

                <div className="flex justify-between items-center">
                    <div>{t('copyright1')}{new Date().getFullYear()}{t("copyright2")}</div>
                    <Links />
                </div>
            </div>
        </footer>
    );
}