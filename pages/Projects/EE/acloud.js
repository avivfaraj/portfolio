import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Styles from '/styles/layout.module.css'
import Image from 'next/image';
import HoverLink from '/components/hoverLink'

export default function Page() {
  return (
    <>
        <section>
            <section>
                <h2> aCloud </h2>
            </section>

            <section id = "introduction">
                <h3> Introduction </h3>
                <p>
                    In this project I created FTP server at home, so I can store
                    files in the server, and access them from any computer. Additionally,
                    I created different users, each of which has access to his own folder.
                    This page is an overview of the hardware that was used in this project.
                    There are also <HoverLink href={"/Projects/CS/ssh"} alt={"SSH"} /> and <HoverLink href={"/Projects/EE/samba"} alt={"Samba"} /> pages where I explain
                    how to configure secure connection via SSH, enable FTP server using samba,
                    and manage users.
                </p>
            </section>

            <section id = "Hardware">
                <h3> Hardware </h3>
                <p>
                    While working on the idea, I planned on using Raspberry Pi 4 with 8GB RAM.
                    However, this board was not available because of supply chain crisis (2022).
                    So I searched for another board that is similar, and found one with NVMe port,
                    so theoretically is faster than USB 3.0. Unfortunatley, this board was also not available,
                    so I kept searching until I found <HoverLink href={"https://libre.computer/products/roc-rk3328-cc/"} alt={"ROC-RK3328-CC (Renegade)"} />. This board has 4GM RAM and a USB 3.0 port,
                    so performace was compromised. Here is a list of all hardware components for that project:
                </p>
                <div className={Styles.tableImageContainer}>
                    <div className={Styles.left}>

                        <ol>
                            <li> <HoverLink href={"https://libre.computer/products/roc-rk3328-cc/"} alt={"ROC-RK3328-CC (Renegade)"} /> - SBC board with 4GB RAM, USB3.0, HDMI, microSD card slot, etc.
                            </li>

                            <li>1TB 2.5-inch SSD with SATA connection</li>

                            <li>SATA to USB3.0 cable</li>

                            <li>MicroSD card (64GB) </li>

                            <li>RPi case with a cooling fan (optional)</li>

                            <li>Ethernet connection</li>

                            <li>HDMI (only required for the installation)</li>

                            <li>MicroUSB (power source)</li>
                        </ol>
                    </div>

                    <div className={Styles.right}>
                        <figure>
                            <img src="/images/acloud/hardware.png" className={Styles['hardware-pic']} />

                            <figcaption> <b>Fig. 1</b> - Hardware.</figcaption>
                        </figure>
                    </div>
            </div>

            </section>

            <section id = "Flash">
                <h3> Flashing OS on SD Card </h3>
                <p>
                    At first I installed Ubuntu 22.04 because I thought it is more stable than Raspbian, but this was a mistake.
                    Ubuntu was very slow, and it never gotten any faster. Also, there were many bugs, such as USB port doesn't work, and
                    a black screen when using GNOME to share screen. Then I deleted Ubuntu and installed Raspbian, and I was surprised by
                    how faster it is than Ubuntu. To flash OS on an SD card, you need to download the <HoverLink href = {"https://libre.computer/products/roc-rk3328-cc/"} alt={"OS Image"} />&nbsp;
                    and you can either use terminal (dd command), or a program to flash image on the SD card.
                    I recommend using <HoverLink href = {"https://www.balena.io/etcher/"} alt={"balenaEtcher"} />, very easy and quick.
                </p>
            </section>

            <section id = "install-os">
                <h3> Server Installation </h3>
                <ul>
                    <li> <strong> SSH - </strong>
                            Once the OS image is installed on the SD Card, you can connect it to the board. A keyboard, a mouse, Ethernet and HDMI connections are also required
                            until SSH is configured. Then, turn on the board using microUSB port and installation process should appear on the connected screen. Once completed, I recommend
                            enabling and configuring SSH to enable remote connection, so the HDMI, keyboard and mouse are no longer required. To make it more secured, I recommend
                            configuring SSH to keys only, so access with password will be denied. More details in <HoverLink href = {"/Projects/CS/ssh"} alt={"SSH"} /> page.
                    </li>

                    <li> <strong> Format Disk - </strong>
                            1TB of storage was utilized in this project, but in order to allow various users to access different directories, the disk
                            must be formatted as ext4 (could also be nfts, but didn't test it) for compatability with Linux (Raspbian is based on Linux).
                            At first, the disk was formatted as ExFAT on my mac because it was an easy process, but it was a mistake. In this case, read and write could
                            done by only one user. Trying to change ownership (chown command) and change permissions (chmod command) didn't work at all. ExFAT is compatible
                            with Windows, and therefore Linux cannot change either ownership or permissions.
                            For that purpose, I used <HoverLink href={"https://gparted.org"} alt={"gparted"} /> which is a program to manage partitions.
                            Another option is to use terminal, but gparted has a great GUI (Graphic User Interface), so it is easier to avoid critical mistakes.
                    </li>

                    <li> <strong> Samba - </strong>
                            <HoverLink href={"https://www.samba.org/samba/"} alt={"Samba"} /> is a free tool that provides file and print sharing services.
                            There could be many users with access to different folders within the shared disk. The users access the server
                            with their username and password which are, currently, generated by the root user through an SSH connection.
                            Samba was also configured to send an email for both connecting to and disconnecting from the server. More on that in the Samba page.
                    </li>

                    <li> <strong> Sharing Screen (Optional) - </strong>
                            This step is not necessary since almost everything can be done through SSH. However, it might be more convenient
                            to be able to control the server from another computer by sharing the screen. While looking for services, I noticed that
                            Raspbian uses a tool that is subscription based. So I searched for a free tool and found <HoverLink href={"https://www.dwservice.net"} alt={"DWS"} /> and is very easy to use.
                            Simply downloaded Raspberry version (.sh file) and copied it to the server. To share screen, the file must be executed on terminal which will
                            create a session and generate temporary username and password. On local machine, go to dws and enter username and password to gain full control.
                            To prevent access from hackers, the .sh file was encrypted with password using <HoverLink href={"https://www.gnupg.org/documentation/manpage.html"} alt={"GnuPG"} />.
                    </li>
                </ul>
            </section>

            <section id = "access">
                <h3> Accessing Server </h3>
                <ul>
                    <li> <strong> SSH - </strong>
                    <code>ssh user@IP_Address</code>
                    </li>

                    <li> <strong> Samba - </strong>
                        To start the server, on terminal run the following:
                        <code>sudo service smbd start</code>
                        This will enable a new connection under Network (on Mac). It will ask for username and password, so directories
                        will be accessible based on the user that logged in.
                    </li>
                </ul>
            </section>

            <section id = "performance">
                <h3> Performance </h3>
                <p>
                Read and write speeds in the server are around 340MB/s and 80MB/s respectivley
                as shown in the images below:
                </p>
                <figure>
                    <img src="/images/acloud/read_speed.png" className={Styles.performance} />
                    <br/>
                    <img src="/images/acloud/write_speed.png" className={Styles.performance}/>
                    <figcaption> <b>Fig. 2</b> - Read (Top) and Write (Bottom) speed tests.&nbsp;
                    <HoverLink href={"https://www.shellhacks.com/disk-speed-test-read-write-hdd-ssd-perfomance-linux/"} alt={"Code Source"} /></figcaption>
                </figure>

                <p>
                These test results follows the expected values of read/write speeds of USB3.0. &nbsp;
                However, the same test should be done on another machine connected to the Samba server in order to evaluate speed over the internet. &nbsp;
                </p>

                <figure>
                    <img src="/images/acloud/read_samba.png" className={Styles.performance} />
                    <br/>
                    <img src="/images/acloud/write_samba.png" className={Styles.performance}/>
                    <figcaption> <b>Fig. 3</b> - Read (Top) and Write (Bottom) speed tests over the internet.&nbsp;
                    <HoverLink href={"https://www.shellhacks.com/disk-speed-test-read-write-hdd-ssd-perfomance-linux/"} alt={"Code Source"} /></figcaption>
                </figure>
                <p>
                As can be seen in the images above, performance is worse than the one performed on the server itself. &nbsp;
                Over the internet, read speed is 11,587,146 bytes/second which is ~11 MB/s, and write speed 10,101,961 bytes/second which is ~9.6 MB/s. &nbsp;
                This test shows that both writing to and reading from this server don't max out the read and write speeds of USB3.0. &nbsp;
                With that in mind, choosing NVMe over USB3.0 would probably not affect this test much. &nbsp;
                Instead, better network speeds, as well as greater RAM will probably increase performance. &nbsp;
                </p>
            </section>


            <section id = "summary">
                <h3> Summary </h3>
                <p>
                Server is up and running, email notifications for both SSH and Samba are working well, so I get notified in real-time.
                The goal of the project was achieved, as I wrote those lines by connecting to the Samba server remotley.
                Read and write speeds are slower than those evaluated on the server, but it is good enough since I am using it for files that are small in size
                such as Python projects, or storing pdf documents.

                </p>
            </section>
            <div className={Styles.gap}/>
        </section>
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}
