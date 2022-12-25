import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Styles from '/styles/layout.module.css'
import Image from 'next/image';

export default function Page() {
  return (
    <>
        <section>
            <section>
                <h2> Secure SSH Connection </h2>
            </section>

            <section id = "introduction">
                <h3> Introduction </h3>
                <p>
                    In this project, SSH connection was enabled in <a href="/Projects/EE/acloud">aCloud</a>, and it was configured
                    to authenticate with keys (public and private) for enhanced security. This webpage is a step-by-step guide to
                    enable and configure SSH in a server.

                </p>
            </section>

            <section id = "enable">
                <h3> Enable SSH on Raspbian </h3>
                <p>
                    Raspbian comes with SSH installed, so enabling it is through settings:
                    <code>sudo raspi-config</code>
                    Configuration window will open in the same terminal, there scroll down to <i>Interface Options (No. 3) </i>
                    and press Enter. This will open the options for interface such as VNC, SSH etc. Scroll down to SSH and follow instructions to enable it.
                </p>

                <p>
                    At this stage, you should be able to access the server by running the following command:
                    <code>ssh user@IP_ADDRESS</code>
                    If you login for the first time, type "yes" for the message that appears. It will also ask for password, so make sure to enter the password of that user you are trying to log into (password is hidden so while typing nothing appears on screen).
                    To enhance security, keys can be utilized for login instead. There are a few steps:
                </p>

                <ol>
                    <li>On local computer (not the server), run the following command to generate both public and private keys:
                    <code>ssh-keygen -t rsa</code>
                    or to make a larger key (more secure):
                    <code>ssh-keygen -t rsa 4096</code>
                    For more information, visit <a href= "https://linux.die.net/man/1/ssh-keygen"> ssh-keygen manual page</a>.
                    </li>

                    <li>It will ask for a directory, press enter for the default directory (~/.ssh/id_rsa).
                    Also, it will ask for passphrase which is another layer of security.
                    You can leave it empty and press Enter if you don't want to add password.
                    </li>

                    <li>Copy <strong>public</strong> key (id_rsa.pub) to the server by running the following command:
                    <code>ssh-copy-id username@IP_ADDRESS</code>
                    You will need to authneticate with password, so make sure it matches the password of "username".
                    </li>

                    <li>At this point login without password should work, although, for me it didn't work until password authentication was disabled on the server.
                    So, in this step, make sure that the server is connected with HDMI to a screen, just in case you lose SSH connection and can't login.
                    Open terminal and run:
                    <code>sudo nano /etc/ssh/sshd_config</code>
                    It will open the configuration file with write premissions. Make sure the following settings are applied:
                    <code>PasswordAuthentication no <br />
                          ChallengeResponseAuthentication no <br/>
                          PubkeyAuthentication yes <br/>
                          AuthorizedKeysFile &emsp; &emsp;.ssh/authorized_keys
                    </code>
                    Now try SSH again, it shouldn't ask for password, and use keys instead.
                    &nbsp; For more information on those settings, visit <a href ="https://linux.die.net/man/5/ssh_config" target="_blank"> ssh-config manual page</a>.
                    <br /><br/>
                    SSH session can be limited to 5 minutes (300 seconds) without activity by adding the following line to /etc/ssh/sshd_config:
                    <code>ClientAliveInterval 300</code>
                    For more information, vist <a href="https://serverauth.com/posts/how-to-configure-ssh-session-timeouts" target="_blank"> session timeouts</a>
                    </li>

                </ol>
            </section>

            <section id = "short-ssh">
                <h3> Shorter SSH Command </h3>
                <p>
                    One can create an alias, so to avoid writing user@IP_ADDRESS everytime we would like to connect through SSH.
                    To do so, in your local machine (not the server), open terminal and run the following command:
                    <code>sudo nano ~/.ssh/config</code>
                    Then, add the following settings:
                    <code>Host ALIAS_NAME <br/>
                    &emsp;&emsp;&emsp;Hostname SERVER_IP_ADDRESS <br/>
                    &emsp;&emsp;&emsp;User SERVER_USERNAME <br/>
                    &emsp;&emsp;&emsp;IdentityFile ~/.ssh/id_rsa
                    </code>
                    <strong>Note:</strong> if you decided to rename the key (other than id_rsa), then it should be updated in IdentityFile as well. <br />
                    Restart SSH service, then run the following command to connect to server:
                    <code>ssh ALIAS_NAME</code>
                </p>
            </section>

            <section id = "email">
                <h3> Email Notification (Optional)</h3>
                <p>
                    This step is crucial for monitoring SSH sessions and enhance security. &nbsp;
                    The sessions are automatically logged in the system log file (/var/log/auth.log), and that's where I get the information from. &nbsp;
                    Email notifications are sent everytime a connection is established, so it allows a quick response in case that someone penetrated the server. &nbsp;
                    This step has 3 files: rc, and two .sh files (bash programs). The first file (rc) is being executed after every successful SSH connection. &nbsp;
                    The other files create an email template (.txt file), and send the email.  &nbsp;
                    Additionaly, you will need an email service that allows third party apps (app password in Gmail). I also tried Yahoo, but their third party service is down.
                </p>
                <ol>
                    <li>Open terminal in the .ssh directory, or open terminal and run the following Command
                        <code>cd ~/.ssh</code>
                    </li>

                    <li>Create a new .sh file (email_temp.sh):
                        <code>sudo nano email_temp.sh</code>
                        This is the template of the email. You can change it according to your needs.
                        <code>echo 'From: ssh-connection &lt;sender_email&gt;\n'\<br/>
                                'To: avivfaraj &lt;receiver_email&gt;\n'\<br/>
                                'Subject: ssh connection established\n\n'\<br/>
                                $1 	&gt; ~/.ssh/mail.txt
                        </code>

                        This file will create the email_template (mail.txt) inside the .ssh directory. Note that $1 means first parameter sent while executing file.  &nbsp;
                        For example:
                        <code>sh email_temp.sh "This is just a test"</code>
                        This code will execute the file and the content will be "This is just a test"
                    </li>

                    <li>Create a new .sh file (send_email.sh):
                        <code>sudo nano send_email.sh</code>
                        This code will send the email using the curl command:
                        <code>curl -s -o /dev/null --ssl-reqd \ <br/>
                        &emsp;&emsp;&emsp;--url 'smtps://smtp.gmail.com:465' \<br/>
                        &emsp;&emsp;&emsp;--user 'SENDER_EMAIL:PASSWORD' \<br/>
                        &emsp;&emsp;&emsp;--mail-from 'SENDER_EMAIL' \<br/>
                        &emsp;&emsp;&emsp;--mail-rcpt 'RECEIVER_EMAIL' \<br/>
                        &emsp;&emsp;&emsp;--upload-file ~/.ssh/mail.txt
                        </code>
                        Replace SENDER_EMAIL and RECEIVER_EMAIL with email addresses. Also, the PASSWORD should be replaced with the app password. &nbsp;
                        The -s -o /dev/null options are utilized for silent execution meaning there will be no output in terminal.
                        <br/ ><br/>
                        <strong>Note: </strong> It is a better practice to use envorinment variables in the code, so instead of writing sensitive information such as password in the file,
                        &nbsp; it is better to read a variable that is defined locally. However, I tried to do so, and it didn't read the variable at all, so login was denied.
                    </li>

                    <li>Create rc file that will execute the above .sh programs and send an email for every connection:
                        <code>sudo nano rc</code>
                        In the file write the following code:
                        <code>details=$(sudo grep "sshd\[[0-9]*\]: Accepted"  /var/log/auth.log | sed 's/ssh2.*/ /g' | tail -1)<br/>
                                echo "$details" &gt;&gt; ~/.ssh/history.log<br/>
                                sh ~/.ssh/email_temp.sh "$details"<br/>
                                sh ~/.ssh/send_email.sh<br/>
                        </code>
                        The first line (details=$...) reads the system log file, and filters the file using regular expression.&nbsp;
                        Then, the key part in the notification is removed using sed command. Finally, the last occurence is saved using tail -1. &nbsp;
                        The second line appends connection information to history.log file (will be created if not exists). &nbsp;
                        This is optional, but I wanted to have a history of sessions just in case I would like to investigate an anomaly.&nbsp;
                        Third line executes email_temp.sh and creates the .txt file (email content), which is sent by the fouth line.
                    </li>
                </ol>

                <section id = "test">
                    <h2> Test </h2>
                    <p>
                    To test it, I connected through SSH and checked my email:
                    </p>
                    <figure>
                        <img src="/images/acloud/email_notification.png" className={Styles.notification} />
                        <figcaption> <b>Fig. 1</b> - Email Received </figcaption>
                    </figure>
                </section>
            </section>

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
