import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Styles from '/styles/layout.module.css'
import Image from 'next/image';
import HoverLink from '/components/hoverLink'
import TOC from '/components/toc'

export default function Page() {
  return (
        <section>
            <div className={Styles.gap}/>

            <section>
                <h1> Samba Connection</h1>
            </section>

            <section>
                <h2 id = "introduction"> Introduction </h2>
                <p>
                    Samba is a free tool for sharing files through network and also enables user management. &nbsp;
                    It comes pre-installed in Raspbian, so installation part is not covered in this guide. &nbsp;
                    In this project, I followed <HoverLink href ={"https://superuser.com/a/1400920"} alt={"user creation guide (jaunerg)"} /> in order to create two users and shared different folders, so one user doesn't affect the other. &nbsp;
                    Additionally, I used bash code (.sh files) similar to the one I used in the <HoverLink href={"/Projects/CS/ssh"} alt={"SSH"} /> page in order to send email notifications.

                </p>
            </section>

            <hr />

            <section >
                <h2 id = "users"> Add a user </h2>

                <ol>
                    <li>To add a user to Samba, the user must also be registered in the OS:
                        <code>sudo adduser --no-create-hom --shell /usr/sbin/nologin USERNAME</code>
                    </li>

                    <li>Add and enable user in Samba using smbpasswd:
                        <code>sudo smbpasswd -a USERNAME <br/>
                              sudo smbpasswd -e USERNAME
                        </code>
                    </li>

                    <li>Assign user to a group. If the group doesn't exist, then create one:
                    <code># Create group <br/>
                          sudo groupadd GROUP <br/> <br/>

                          # Assign user to a group<br/>
                          sudo usermod -G GROUPS USERNAME
                    </code>
                    Here GROUPS must be replaced with all the groups we would like to assign to USERNAME. &nbsp;
                    This operation overrides previous ones, so if you want to assign a user to a few groups, you must list them above (comma-separated).
                    </li>

                    <li>Create a directory that will be shared with this user and change its group:
                        <code>
                              # Create directory <br/>
                              sudo mkdir PATH_TO_DIRECTORY<br/><br/>

                              # Change group<br/>
                              sudo chown root:GROUP PATH_TO_DIRECTORY<br/>
                        </code>
                        <strong>Note: </strong> You can also change permissions with chmod command, but it can be configured in Samba configuration file.
                    </li>

                    <li> Add users to Samba configuration file. Before doing so, make sure you have a copy of the original file (backup):
                        <code>sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.backup</code>
                        You can use "ls" command to verify backup exists:
                        <code>sudo ls /etc/samba/</code>
                        Then open config file as super user:
                        <code>sudo nano /etc/samba/smb.conf</code>
                        And append the new shared folder to the end:
                        <code> [SHARE_NAME]<br/>
                        &emsp;&emsp;&emsp;comment = Shared folder called SHARE_NAME<br/>
                        &emsp;&emsp;&emsp;path = PATH_TO_DIRECTORY<br/>
                        &emsp;&emsp;&emsp;browseable = yes<br/>
                        &emsp;&emsp;&emsp;read only = no  <br/>
                        &emsp;&emsp;&emsp;guest ok = no &emsp;# No guests allowed<br/>
                        &emsp;&emsp;&emsp;create mask = 0777 &emsp;# Can change permissions here<br/>
                        &emsp;&emsp;&emsp;directory mask = 0777 &emsp;# Directory permissions here<br/>
                        &emsp;&emsp;&emsp;writable = yes<br/>
                        &emsp;&emsp;&emsp;valid users = USERNAME &emsp;# List of users that are allowed to access this directory<br/>
                        &emsp;&emsp;&emsp;force user = USERNAME &emsp;# Default user assigned when connecting to this share<br/>
                        </code>
                        For more information on smb.conf, visit <HoverLink href={"https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html"} alt={"Samba documentation"} />
                    </li>

                    <li> Restart samba and try to log in:
                    <code>sudo service smbd restart</code>
                    </li>
                </ol>
            </section>

            <hr />
            
            <section>
                <h2 id = "email"> Email Notification (Optional)</h2>
                <p>
                    This step is crucial for monitoring Samba sessions and enhance security. &nbsp;
                    Samba has a few <HoverLink href = {"https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html"} alt={"variables (VARIABLE SUBSTITUTIONS)"} /> we can utilize in order to create log files &nbsp;
                    Email notifications are sent for each login to or logout from a shared directory, so it allows a quick response in case that someone penetrated the server. &nbsp;
                    Additionaly, you will need an email service that allows third party apps (app password in Gmail). I also tried Yahoo, but their third party service is down.
                </p>
                <ol>
                    <li>Open terminal in /usr/local/bin/ directory, or open terminal and run the following Command
                        <code>cd /usr/local/bin</code>
                    </li>

                    <li>Create a new .sh file (email_temp.sh):
                        <code>sudo nano email_temp.sh</code>
                        This is the template of the email. You can change it according to your needs.
                        <code>echo 'From: Samba Connection &lt;sender_email&gt;\n'\<br/>
                                'To: avivfaraj &lt;receiver_email&gt;\n'\<br/>
                                'Subject: '$1 '\n\n'\<br/>
                                $2 	&gt; /usr/local/bin/samba_email.txt
                        </code>

                        This code will create the email_template (samba_email.txt) inside /usr/local/bin/ directory. Note that $1,$2 mean the first and second parameters sent while executing file.  &nbsp;
                        For example:
                        <code>sh email_temp.sh "First parameter" "Second parameter"</code>
                        This code will create a .txt containing "Subject: First parameter" and the content will be "Second parameter"
                    </li>

                    <li>Create a new .sh file (send_email.sh):
                        <code>sudo nano send_email.sh</code>
                        This code will send the email using the curl command:
                        <code>curl --ssl-reqd \ <br/>
                        &emsp;&emsp;&emsp;--url 'smtps://smtp.gmail.com:465' \<br/>
                        &emsp;&emsp;&emsp;--user 'SENDER_EMAIL:PASSWORD' \<br/>
                        &emsp;&emsp;&emsp;--mail-from 'SENDER_EMAIL' \<br/>
                        &emsp;&emsp;&emsp;--mail-rcpt 'RECEIVER_EMAIL' \<br/>
                        &emsp;&emsp;&emsp;--upload-file /usr/local/bin/samba_email.txt
                        </code>
                        Replace SENDER_EMAIL and RECEIVER_EMAIL with email addresses. Also, the PASSWORD should be replaced with the app password. &nbsp;
                        <br/ ><br/>
                        <strong>Note: </strong> It is a better practice to use envorinment variables in the code, so instead of writing sensitive information such as password in the file,
                        &nbsp; it is better to read a variable that is defined locally. However, I tried to do so, and it didn't read the variable at all, so login was denied.
                    </li>

                    <li>Create another .sh file that will execute the above .sh programs and send an email for each connection or disconnection:
                        <code>sudo nano custom_log.sh</code>
                        In the file write the following code:
                        <code> msg='' <br/>
                                title='' <br/>
                                if [ $1 -eq 2 ]; then<br/>
                                &emsp;&emsp;&emsp; msg="Connected to"<br/>
                                &emsp;&emsp;&emsp; title="Samba connection established"<br/>
                                else<br/>
                                &emsp;&emsp;&emsp; msg="Disconnected from"<br/>
                                &emsp;&emsp;&emsp; title="Samba Disconnected"<br/>
                                fi<br/><br/>

                                if [ $1 -eq 2 ] || [ $1 -eq 3 ]; then<br/>
                                &emsp;&emsp;&emsp; mailcontent="$&#123;2&#125; $&#123;3&#125; - $&#123;msg&#125; $&#123;4&#125; on $&#123;5&#125; by $&#123;6&#125; at $&#123;7&#125; os $&#123;8&#125; using $&#123;9&#125; ip $&#123;10&#125;"<br/>
                                &emsp;&emsp;&emsp; echo "$&#123;mailcontent&#125;" &gt;&gt; /usr/local/bin/history.log<br/>
                                &emsp;&emsp;&emsp; sh /usr/local/bin/mail_temp.sh "$title" "$mailcontent" <br/>
                                &emsp;&emsp;&emsp; sh /usr/local/bin/send_email.sh<br/>
                                fi<br/>
                        </code>
                        Note that $1 can be either 2 for connection or 3 for disconnection.
                    </li>

                    <li>
                    Finally, add <i>root prexec</i> and <i>root postexec</i> parameters under the shared folder in /etc/samba/smb.conf:
                    <code>root preexec = sh /usr/local/bin/custom_log.sh 2 %T %S %h %u %m %a %R %I <br />
                    root postexec = sh /usr/local/bin/custom_log.sh 3 %T %S %h %u %m %a %R %I
                    </code>
                    Those parameters are executed as root at login (preexec) and logout (postexec).
                    Please note that you can place them under [global] (without the root) in order to affect all users, but it didn't work as expected.
                    In other words, both preexec and postexec were executed at login. Therefore, I place these two lines under every share I create as can be seen in the code below:
                    <code> [SHARE_NAME]<br/>
                    &emsp;&emsp;&emsp;comment = Shared folder called SHARE_NAME<br/>
                    &emsp;&emsp;&emsp;path = PATH_TO_DIRECTORY<br/>
                    &emsp;&emsp;&emsp;browseable = yes<br/>
                    &emsp;&emsp;&emsp;read only = no  <br/>
                    &emsp;&emsp;&emsp;guest ok = no &emsp;# No guests allowed<br/>
                    &emsp;&emsp;&emsp;create mask = 0777 &emsp;# Can change permissions here<br/>
                    &emsp;&emsp;&emsp;directory mask = 0777 &emsp;# Directory permissions here<br/>
                    &emsp;&emsp;&emsp;writable = yes<br/>
                    &emsp;&emsp;&emsp;valid users = USERNAME &emsp;# List of users that are allowed to access this directory<br/>
                    &emsp;&emsp;&emsp;force user = USERNAME &emsp;# Default user assigned when connecting to this share<br/>
                    &emsp;&emsp;&emsp;root preexec = sh /usr/local/bin/custom_log.sh 2 %T %S %h %u %m %a %R %I <br />
                    &emsp;&emsp;&emsp;root postexec = sh /usr/local/bin/custom_log.sh 3 %T %S %h %u %m %a %R %I
                    </code>

                    Also, %T, %S, %h, etc. are all samba variables, for instance, %T is time and date. Please note that %T is unique since it returns two values: one for date, and one for time.
                    It means that $2, $3 in custom_log.sh represent date and time respectively.
                    </li>
                </ol>

                <div className={Styles.gap}/>
            </section>

        </section>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      <TOC />
      {page}
    </Layout>
  )
}


// <section id = "test">
//     <h2> Test </h2>
//     <p>
//     To test it, I connected through SSH and checked my email:
//     </p>
//     <figure>
//         <img src="/images/acloud/email_notification.png" className={Styles.notification} />
//         <figcaption> <b>Fig. 1</b> - Email Received </figcaption>
//     </figure>
// </section>
