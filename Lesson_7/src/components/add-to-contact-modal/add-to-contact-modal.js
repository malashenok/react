import IconButton from "@material-ui/core/IconButton"
import Modal from "@material-ui/core/Modal"
import CloseIcon from "@material-ui/icons/Close"
import classnames from "classnames"
import React from "react"
import styles from "./add-to-contact-modal.module.css"

const contacts = Array.from({ length: 50 }, (_, i) => `room${i}`)

export const AddContactModal = ({
  isOpen,
  onClose,
  onClick,
  conversations,
}) => {
  const checkActiveConversation = (contact) => {
    return (
      conversations.findIndex(
        (conversation) => conversation.title === contact,
      ) !== -1
    )
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h6 className={styles.title}>Добавить участников</h6>
        <div className={styles.corner}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            className={styles.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <ul>
          {contacts.map((contact) => (
            <li
              className={classnames({
                [styles.active]: checkActiveConversation(contact),
              })}
              key={contact}
              onClick={() => {
                onClick(contact)
              }}
            >
              {contact}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}
