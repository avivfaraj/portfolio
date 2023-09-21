---
title: "Samba Configuration"
date: "2022-10-16"
image: logo.jpeg
desc: Utilized Samba to share storage (cloud). It was configured to share folders with different users, and to send email notification for better protection
keywords: "Samba, Cloud, SMB."
isFeatured: true
github:
---


# Samba Connection

## Introduction {#introduction}

Samba is a free tool for sharing files through network and also enables user management. It comes pre-installed in Raspbian, so installation part is not covered in this guide.
In this project, I followed [user creation guid (jaunerg)](https://superuser.com/a/1400920) in order to create two users and shared different folders, so one user doesn't affect the other. Additionally, I used bash code (.sh files) similar to the one I used in the [SSH](/Projects/CS/secure-ssh) page in order to send email notifications.


## Add a user {#users}

1. To add a user to Samba, the user must also be registered in the OS:

    ```shell
    sudo adduser --no-create-hom --shell /usr/sbin/nologin USERNAME
    ```
1. Add and enable user in Samba using smbpasswd:
    ```shell
    sudo smbpasswd -a USERNAME
    sudo smbpasswd -e USERNAME
    ```

1. Assign user to a group. If the group doesn't exist, then create one:
    ```shell
    # Create group
    sudo groupadd GROUP

    # Assign user to a group
    sudo usermod -G GROUPS USERNAME
    ```

    Here GROUPS must be replaced with all the groups we would like to assign to USERNAME.
    This operation overrides previous ones, so if you want to
    assign a user to a few groups, you must list them above (comma-separated).


1. Create a directory that will be shared with this user and change its group:


    ```shell
    # Create directory
    sudo mkdir PATH_TO_DIRECTORY

    # Change group
    sudo chown root:GROUP PATH_TO_DIRECTORY
    ```

    **Note:** You can also change permissions with chmod command,
    but it can be configured in Samba configuration file.

1. Add users to Samba configuration file.

    Before doing so, make sure you have a copy of the original file (backup):
    ```shell
    sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.backup
    ```

    You can use "ls" command to verify backup exists:
    ```shell
    sudo ls /etc/samba/
    ```

    Then open config file as super user:
    ```shell
    sudo nano /etc/samba/smb.conf
    ```

    And append the new shared folder to the end:
    ```shell
    [SHARE_NAME]
        comment = Shared folder called SHARE_NAME
        path = PATH_TO_DIRECTORY
        browseable = yes
        read only = no
        guest ok = no   # No guests allowed
        create mask = 0777  # Can change permissions here
        directory mask = 0777   # Directory permissions here
        writable = yes
        valid users = USERNAME  # List of users that are
                                # allowed to access this directory
        force user = USERNAME   # Default user assigned when connecting to this share
    ```

    For more information on smb.conf, visit [Samba documentation](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html)

6. Restart samba and try to log in:
    ```shell
    sudo service smbd restart
    ```

## Email Notification (Optional){#email}
This step is crucial for monitoring Samba sessions and enhance security.
Samba has a few [variables (VARIABLE SUBSTITUTIONS)](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html) we can utilize in order to create log files
Email notifications are sent for each login to or logout from a shared directory, so it allows a quick response in case that someone penetrated the server.
Additionaly, you will need an email service that allows third party apps (app password in Gmail). I also tried Yahoo, but their third party service is down.

1. Open terminal in /usr/local/bin/ directory.

     or open terminal and run the following Command
    ```shell
    cd /usr/local/bin
    ```


1. Create a new .sh file (email_temp.sh):
    ```shell
    sudo nano email_temp.sh
    ```
    This is the template of the email. You can change it according to your needs.
    ```shell
    echo 'From: Samba Connection &lt;sender_email&gt;\n'\
            'To: avivfaraj &lt;receiver_email&gt;\n'\
            'Subject: '$1 '\n\n'\
            $2 	&gt; /usr/local/bin/samba_email.txt
    ```

    This code will create the email_template (samba_email.txt) inside /usr/local/bin/ directory. Note that $1,$2 mean the first and second parameters sent while executing file.
    For example:
    ```shell
    sh email_temp.sh "First parameter" "Second parameter"
    ```
    This code will create a .txt containing "Subject: First parameter" and the content will be "Second parameter"

1. Create a new .sh file (send_email.sh):
    ```shell
    sudo nano send_email.sh
    ```
    This code will send the email using the curl command:
    ```shell
    curl --ssl-reqd \
        --url 'smtps://smtp.gmail.com:465' \
        --user 'SENDER_EMAIL:PASSWORD' \
        --mail-from 'SENDER_EMAIL' \
        --mail-rcpt 'RECEIVER_EMAIL' \
        --upload-file /usr/local/bin/samba_email.txt
    ```
    Replace SENDER_EMAIL and RECEIVER_EMAIL with email addresses. Also, the PASSWORD should be replaced with the app password.


    **Note:** It is a better practice to use envorinment variables in the code, so instead of writing sensitive information such as password in the file,
    it is better to read a variable that is defined locally. However, I tried to do so, and it didn't read the variable at all, so login was denied.

1. Create another .sh file that will execute the above .sh programs and send an email for each connection or disconnection:
    ```shell
    sudo nano custom_log.sh
    ```
    In the file write the following code:
    ```shell
    msg=''
    title=''
    if [ $1 -eq 2 ]; then
        msg="Connected to"
        title="Samba connection established"
    else
        msg="Disconnected from"
        title="Samba Disconnected"
    fi

    if [ $1 -eq 2 ] || [ $1 -eq 3 ]; then
        mailcontent="${2} ${3} - ${msg} ${4} on ${5} by ${6} at ${7} os ${8} using ${9} ip ${10}"
        echo "${mailcontent}" >> /usr/local/bin/history.log
        sh /usr/local/bin/mail_temp.sh "$title" "$mailcontent"
        sh /usr/local/bin/send_email.sh
    fi
    ```
    Note that $1 can be either 2 for
    connection or 3 for disconnection.

1. Finally, add __root prexec__ and __root postexec__ parameters under the shared folder in /etc/samba/smb.conf:

    ```shell
    root preexec = sh /usr/local/bin/custom_log.sh 2 %T %S %h %u %m %a %R %I
    root postexec = sh /usr/local/bin/custom_log.sh 3 %T %S %h %u %m %a %R %I
    ```
    Those parameters are executed as root at
    login (preexec) and logout (postexec).
    Please note that you can place them under
    [global] (without the root) in order
    to affect all users, but it didn't work as expected.
    In other words, both preexec and postexec
    were executed at login. Therefore, I place
    these two lines under every share I create
    as can be seen in the code below:

    ```shell
    [SHARE_NAME]
        comment = Shared folder called SHARE_NAME
        path = PATH_TO_DIRECTORY
        browseable = yes
        read only = no
        guest ok = no   # No guests allowed
        create mask = 0777  # Can change permissions here
        directory mask = 0777   # Directory permissions here
        writable = yes
        valid users = USERNAME  # List of users that are allowed to access this directory
        force user = USERNAME   # Default user assigned when connecting to this share
        root preexec = sh /usr/local/bin/custom_log.sh 2 %T %S %h %u %m %a %R %I
        root postexec = sh /usr/local/bin/custom_log.sh 3 %T %S %h %u %m %a %R %I
    ```
    Also, %T, %S, %h, etc. are all samba variables,
    for instance,%T is time and date. Please note that
    %T is unique since it returns two values:
    one for date, and one for time. It means that $2, $3 in custom_log.sh represent date and time respectively.

