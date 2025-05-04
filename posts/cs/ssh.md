---
title: "SSH Connection"
date: "2022-10-16"
image: logo.jpeg
desc: Establish secure connection from any computer within the internal network.
keywords: SSH, Samba.
isFeatured: true
github:
---

# SSH Connection

## Introduction {#introduction}


In this project, SSH connection was enabled in [aCloud](/Projects/EE/acloud), and it was configured to authenticate with keys (public and private) for enhanced security. This webpage is a step-by-step guide to enable and configure SSH in a server.


***


## Enable SSH on Raspbian {#enable}

Raspbian comes with SSH installed, so enabling it is through settings:
```shell
sudo raspi-config
```

Configuration window will open in the same terminal, there scroll down to __Interface Options (No. 3)__
and press Enter. This will open the options for interface such as VNC, SSH etc. Scroll down to SSH and follow instructions to enable it.

At this stage, you should be able to access the server by running the following command:
```shell
ssh user@IP_ADDRESS
```
If you login for the first time, type "yes" for the message that appears. It will also ask for password, so make sure to enter the password of that user you are trying to log into (password is hidden so while typing nothing appears on screen).
To enhance security, keys can be utilized for login instead. There are a few steps:


- On local computer (not the server), run the following command to generate both public and private keys:
  ```shell
  ssh-keygen -t rsa
  ```
  or to make a larger key (more secure):
  ```shell
  ssh-keygen -t rsa 4096
  ```
  For more information, visit [ssh-keygen manual page](https://linux.die.net/man/1/ssh-keygen).

- It will ask for a directory, press enter for the default directory (~/.ssh/id_rsa).
  Also, it will ask for passphrase which is another layer of security.
  You can leave it empty and press Enter if you don't want to add password.

- Copy **public** key (id_rsa.pub) to the server by running the following command:
  ```shell
  ssh-copy-id username@IP_ADDRESS
  ```
  You will need to authneticate with password, so make sure it matches the password of "username".

- At this point login without password should work, although, for me it didn't work until password authentication was disabled
  on the server. So, in this step, make sure that the server is connected with HDMI to a screen, just in case you lose SSH connection and can't login. Open terminal and run:
  ```shell
  sudo nano /etc/ssh/sshd_config
  ```
  It will open the configuration file with write premissions. Make sure the following settings are applied:
  ```shell
  PasswordAuthentication no
  ChallengeResponseAuthentication no
  PubkeyAuthentication yes
  AuthorizedKeysFile  .ssh/authorized_keys
  ```
  Now try SSH again, it shouldn't ask for password, and use keys instead. For more information on those settings, visit [ssh-config manual page](https://linux.die.net/man/5/ssh_config).
  SSH session can be limited to 5 minutes (300 seconds) without activity by adding the following line to /etc/ssh/sshd_config:
  ```shell
  ClientAliveInterval 300
  ```
  For more information, vist [session timeouts](https://serverauth.com/posts/how-to-configure-ssh-session-timeouts).


***


## Shorter SSH Command {#short-ssh}

One can create an alias, so to avoid writing user@IP_ADDRESS everytime we would like to connect through SSH.
To do so, in your local machine (not the server), open terminal and run the following command:
```shell
sudo nano ~/.ssh/config
```
Then, add the following settings:
```shell
Host ALIAS_NAME
    Hostname SERVER_IP_ADDRESS
    User SERVER_USERNAME
    IdentityFile ~/.ssh/id_rsa
```
**Note:** if you decided to rename the key (other than id_rsa), then it should be updated in IdentityFile as well.
Restart SSH service, then run the following command to connect to server:
```shell
ssh ALIAS_NAME
```


***

## Email Notification (Optional) {#email}

This step is crucial for monitoring SSH sessions and enhance security. The sessions are automatically logged in the system log file (/var/log/auth.log), and that's where I get the information from. Email notifications are sent everytime a connection is established, so it allows a quick response in case that someone penetrated the server. This step has 3 files: rc, and two .sh files (bash programs). The first file (rc) is being executed after every successful SSH connection. The other files create an email template (.txt file), and send the email. Additionaly, you will need an email service that allows third party apps (app password in Gmail). I also tried Yahoo, but their third party service is down.

- Open terminal in the .ssh directory, or open terminal and run the following Command
  ```shell
  cd ~/.ssh
  ```

- Create a new .sh file (email_temp.sh):
  ```shell
  sudo nano email_temp.sh
  ```
  This is the template of the email. You can change it according to your needs.
  ```shell
  echo "From: ssh-connection &lt;${SENDER_EMAIL}&gt;\n"\
          "To: avivfaraj &lt;${RECEIVER_EMAIL}&gt;\n"\
          "Subject: ssh connection established\n\n"\
          $1 	> ~/.ssh/mail.txt
  ```
  This file will create the email_template (mail.txt) inside the .ssh directory. Note that $1 means first parameter sent while executing file.
  For example:
  ```shell
  sh email_temp.sh "This is just a test"
  ```
  This code will execute the file and the content will be "This is just a test"

- Create a new .sh file (send_email.sh):
  ```shell
  sudo nano send_email.sh
  ```
  This code will send the email using the curl command:
  ```shell {"filename": "send_email.sh"}
  curl -s -o /dev/null --ssl-reqd \
        --url "smtps://smtp.gmail.com:465" \
        --user "${SENDER_EMAIL}:${EMAIL_PASSWORD}" \
        --mail-from "${SENDER_EMAIL}" \
        --mail-rcpt "${RECEIVER_EMAIL}" \
        --upload-file ~/.ssh/mail.txt
  ```
  `SENDER_EMAIL`, `RECEIVER_EMAIL` and `EMAIL_PASSWORD` are all environment variables and should be defined prior to execution.
  The -s -o /dev/null options are utilized for silent execution meaning there will be no output in terminal.

- Create rc file that will execute the above .sh programs and send an email for every connection:
  ```shell
  sudo nano rc
  ```
  In the file write the following code:
  ```shell
  details=$(sudo grep "sshd\[[0-9]*\]: Accepted"  /var/log/auth.log | sed 's/ssh2.*/ /g' | tail -1)
  echo "$details" >> ~/.ssh/history.log<br/>
  sh ~/.ssh/email_temp.sh "$details"
  sh ~/.ssh/send_email.sh<br/>
  ```
  The first line (details=$...) reads the system log file, and filters the file using regular expression.
  Then, the key part in the notification is removed using sed command. Finally, the last occurence is saved using tail -1.
  The second line appends connection information to history.log file (will be created if not exists).
  This is optional, but I wanted to have a history of sessions just in case I would like to investigate an anomaly.
  Third line executes email_temp.sh and creates the .txt file (email content), which is sent by the fouth line.


***


## Test {#test}

To test it, I connected through SSH and checked my email:

![email test {600x125} {caption: Email Received}](ssh/email_notification.png)

Then, I tried to connect from a different computer to test authentication without keys. Since password authentication was disabled, I expect SSH login to be denied.

![Access test  {450x50} {caption: Access Denied}](ssh/access_denied.png)

I also tried to copy-paste both public and private authentication keys from the authorized computer to another computer, and login was denied, so server is secured.
